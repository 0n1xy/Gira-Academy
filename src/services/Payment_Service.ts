import Stripe from "stripe";

class StripePaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
      apiVersion: "2024-06-20",
    });
  }

  async createCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    successUrl: string,
    cancelUrl: string
  ) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card", "alipay"],
        line_items: lineItems,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      });
      return session;
    } catch (error: any) {
      console.error("Error creating Checkout Session:", error);
      throw new Error(`Error creating Checkout Session: ${error.message}`);
    }
  }
}

export default StripePaymentService;
