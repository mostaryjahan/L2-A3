import express, { Request, Response, Router } from "express";
import { Borrow } from "../models/borrow.model";


const borrowRoutes: Router = express.Router();

borrowRoutes.post( "/", async (req: Request, res: Response): Promise<void> => {
    try {
      const { book, quantity, dueDate } = req.body;

      if (!book || !quantity || !dueDate) {
        res.status(400).json({
          success: false,
          message: "Missing required fields: book, quantity, or dueDate",
        });
        return;
      }

      const data = await Borrow.borrowBook(book, quantity, new Date(dueDate));
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to borrow book",
        error: error.message,
      });
    }
  }
);

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.getBorrowedSummary();

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch borrowed summary",
      error: error.message
    });
  }
});

export default borrowRoutes;