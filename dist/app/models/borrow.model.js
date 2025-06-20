"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
    },
    dueDate: { type: Date, required: true },
}, { timestamps: true, versionKey: false });
borrowSchema.statics.borrowBook = function (bookId, quantity, dueDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(bookId);
        if (!book)
            throw new Error("Book not found");
        if (book.copies < quantity) {
            throw new Error(`Not enough copies. Only ${book.copies} available.`);
        }
        book.copies -= quantity;
        book.available = book.copies > 0;
        yield book.save();
        return this.create({ book: bookId, quantity, dueDate });
    });
};
borrowSchema.statics.getBorrowedSummary = function () {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
};
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
