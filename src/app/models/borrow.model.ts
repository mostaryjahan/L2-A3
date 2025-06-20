import { model, Schema } from "mongoose";
import { Book } from "./book.model";
import { IBorrow, IBorrowModel } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"]
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

borrowSchema.statics.borrowBook = async function (bookId: string, quantity: number, dueDate: Date) {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");

  if (book.copies < quantity) {
    throw new Error(`Not enough copies. Only ${book.copies} available.`);
  }

  book.copies -= quantity;
  book.available = book.copies > 0;
  await book.save();

  return this.create({ book: bookId, quantity, dueDate });
};

borrowSchema.statics.getBorrowedSummary = async function () {
  return this.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" }
      }
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails"
      }
    },
    {
      $unwind: "$bookDetails"
    },
    {
      $project: {
        _id: 0,
        "book.title": "$bookDetails.title",
        "book.isbn": "$bookDetails.isbn",
        totalQuantity: 1
      }
    }
  ]);
};

export const Borrow = model<IBorrow, IBorrowModel>("Borrow", borrowSchema);