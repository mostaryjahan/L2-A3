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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const borrowRoutes = express_1.default.Router();
borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        if (!book || !quantity || !dueDate) {
            res.status(400).json({
                success: false,
                message: "Missing required fields: book, quantity, or dueDate",
            });
            return;
        }
        const data = yield borrow_model_1.Borrow.borrowBook(book, quantity, new Date(dueDate));
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to borrow book",
            error: error.message,
        });
    }
}));
borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.getBorrowedSummary();
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch borrowed summary",
            error: error.message
        });
    }
}));
exports.default = borrowRoutes;
