import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { config } from "./config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.dbUrl);

    server = app.listen(config.port, () => {
    
      console.log(`Server is listening to PORT: http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log("DB connection error",err);
  }
}

main();