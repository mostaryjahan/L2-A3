import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
export interface IBorrowModel extends Model<IBorrow> {
  borrowBook(bookId: string, quantity: number, dueDate: Date): Promise<IBorrow>;
  getBorrowedSummary(): Promise<any[]>;
}