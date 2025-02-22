import { Request, Response } from "express";
import StripePaymentService from "@/services/Payment_Service";
import Cart from "@/models/Cart_Schema";
import Products from "@/models/Products_Schema";
import Invoice from "@/models/Invoice_Schema";
import { BILL_STATUS, BILL_URL } from "@/constant/Bill_Constant";
import cron from "node-cron";
import ShopsModel from "@/models/Shops_Schema";
import { KafkaService } from "@/services/Kafka_Service";

const stripePaymentService = new StripePaymentService();
const kafkaService = new KafkaService();

export const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId, cartIds } = req.body;

    let cartIdArray = cartIds;
    if (!Array.isArray(cartIdArray)) {
      cartIdArray = [cartIdArray];
    }

    if (cartIdArray.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No cart IDs provided",
      });
    }

    let totalPrice = 0;
    const lineItems = [];
    const productItems = [];

    for (const cartId of cartIdArray) {
      const cart = await Cart.findById(cartId).exec();
      if (!cart) {
        return res.status(500).json({
          status: 500,
          message: `Cart not found for ID: ${cartId}`,
        });
      }

      if (cart.user_id.toString() !== userId) {
        return res.status(403).json({
          status: 403,
          message: `Unauthorized access to cart ID: ${cartId}`,
        });
      }

      const product = await Products.findById(cart.product_id).exec();
      if (!product) {
        return res.status(500).json({
          status: 500,
          message: `Product not found for ID: ${cart.product_id}`,
        });
      }

      const productName = product.product_name;
      const productPrice = product.price;
      const cartQuantity = cart.quantity;
      const cartTotalPrice = productPrice * cartQuantity;

      totalPrice += cartTotalPrice;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: productName,
          },
          unit_amount: productPrice,
        },
        quantity: cartQuantity,
      });

      productItems.push({
        productId: cart.product_id,
        quantity: cart.quantity,
      });
    }

    const successUrl = `${BILL_URL.SUCCESS}${userId}`;
    const cancelUrl = `${BILL_URL.CANCEL}${userId}`;

    const session = await stripePaymentService.createCheckoutSession(
      lineItems,
      successUrl,
      cancelUrl
    );

    const invoice = await Invoice.create({
      userId,
      productItems,
      total_money: totalPrice,
      status: BILL_STATUS.PENDING,
    });

    await kafkaService.connectProducer();

    await kafkaService.sendMessage(`${invoice._id}`, {
      invoiceId: invoice._id,
      userId,
      total_money: totalPrice,
      status: BILL_STATUS.PENDING,
    });

    if (session.url) {
      res.json({
        status: 200,
        message: "Checkout URL generated successfully",
        data: { url: session.url },
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Failed to create Checkout Session",
        error: "Checkout URL is null",
      });
    }
  } catch (error: any) {
    console.error("Error creating Checkout Session:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message || "Unknown error",
    });
  }
};

export const handleSuccessPayment = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const invoice = await Invoice.findOne({
      userId,
      status: BILL_STATUS.PENDING,
    });

    if (!invoice) {
      return res.status(404).json({
        status: 404,
        message: "Bill not found or already paid",
      });
    }

    const updatedBill = await Invoice.findOneAndUpdate(
      { _id: invoice._id, version: invoice.version },
      { status: BILL_STATUS.PAID, version: invoice.version + 1 },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(409).json({
        status: 409,
        message: "Conflict error, please retry",
      });
    }

    await kafkaService.sendMessage("payment_canceled", {
      invoiceId: updatedBill._id,
      userId,
      status: BILL_STATUS.CANCEL,
    });

    // Calculate the total money for each shop
    const shopBalances: { [key: string]: number } = {};
    for (const item of invoice.productItems) {
      const product = await Products.findById(item.productId).exec();
      if (!product) continue;

      const shopIdStr = product.shop_id.toString();
      if (!shopBalances[shopIdStr]) {
        shopBalances[shopIdStr] = 0;
      }
      shopBalances[shopIdStr] += product.price * item.quantity;
    }

    // Update the balance for each shop
    for (const [shopId, totalMoney] of Object.entries(shopBalances)) {
      await ShopsModel.findByIdAndUpdate(
        shopId,
        { $inc: { balance: totalMoney } },
        { new: true }
      ).exec();
    }

    // Delete the cart items after successful payment
    await Cart.deleteMany({ user_id: userId });

    console.log(`Payment successful for user ID: ${userId}`);
    res.send("Payment Successful");
  } catch (error: any) {
    console.error("Error updating bill status on success:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message || "Unknown error",
    });
  }
};

export const handleCancelPayment = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const bill = await Invoice.findOne({ userId, status: BILL_STATUS.PENDING });

    if (!bill) {
      return res.status(404).json({
        status: 404,
        message: "Bill not found or already processed",
      });
    }

    const updatedBill = await Invoice.findOneAndUpdate(
      { _id: bill._id, version: bill.version },
      { status: BILL_STATUS.CANCEL, version: bill.version + 1 },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(409).json({
        status: 409,
        message: "Conflict error, please retry",
      });
    }

    await kafkaService.sendMessage("payment_canceled", {
      invoiceId: updatedBill._id,
      userId,
      status: BILL_STATUS.CANCEL,
    });

    console.log(`Payment canceled for user ID: ${userId}`);
    res.send("Payment Canceled");
  } catch (error: any) {
    console.error("Error updating bill status on cancellation:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message || "Unknown error",
    });
  }
};

// Initialize the cron job to check for expired bills
const getObjectIdCreationDate = (objectId: any) => {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

cron.schedule("* * * * *", async () => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    // Find all pending bills
    const pendingBills = await Invoice.find({ status: BILL_STATUS.PENDING });

    for (const bill of pendingBills) {
      const creationDate = getObjectIdCreationDate(bill._id.toString());

      // Check if the bill is older than 30 minutes
      if (creationDate < thirtyMinutesAgo) {
        bill.status = BILL_STATUS.CANCEL;
        await bill.save();
        console.log(
          `Bill ID: ${bill._id} has been canceled due to expiration.`
        );
      }
    }
  } catch (error) {
    console.error("Error updating expired bills:", error);
  }
});
