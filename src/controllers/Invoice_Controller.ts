import { Request, Response } from "express";
import { IInvoice } from "@/types/Invoice_Interface";
import Invoice from "@/models/Invoice_Schema";

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { userId, cartIds, total_money, status } = req.body;

    const newInvoice = new Invoice({
      userId,
      cartIds,
      total_money,
      status,
    });

    const savedInvoice = await newInvoice.save();

    res.status(201).json({
      status: 201,
      message: "Bill created successfully",
      data: savedInvoice,
    });
  } catch (error: any) {
    console.error("Error creating bill:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message || "Unknown error",
    });
  }
};

// Get a single bill by ID
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const invoiceId = req.params.id;

    const bill = await Invoice.findById(invoiceId).exec();
    if (!bill) {
      return res.status(404).json({
        status: 404,
        message: "Bill not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Bill retrieved successfully",
      data: bill,
    });
  } catch (error: any) {
    console.error("Error retrieving bill:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message || "Unknown error",
    });
  }
};

// Get all bills
export const getAllBills = async (req: Request, res: Response) => {
  try {
    const bills = await Invoice.find().exec();

    res.status(200).json({
      status: 200,
      message: "Bills retrieved successfully",
      data: bills,
    });
  } catch (error: any) {
    console.error("Error retrieving bills:", error);
    res.status(500).json({
      status: 500,
      message: "Server error",
      error: error.message || "Unknown error",
    });
  }
};
