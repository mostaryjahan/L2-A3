import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import borrowRoutes from "./app/controllers/borrow.controller";
import cors from "cors";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://l2-a4-client.vercel.app"
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));      
app.options("*", cors(corsOptions));


app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

export default app;
