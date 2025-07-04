import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import borrowRoutes from "./app/controllers/borrow.controller";
import cors from "cors";



const app: Application = express();

const allowedOrigins = ["http://localhost:5173", "https://l2-a4-client.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    }
  })
);


app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

export default app;