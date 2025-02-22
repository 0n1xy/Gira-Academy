import { randomUser } from "@/db/seeds/index_seed";
import { default as ConnectDB } from "@/services/Mongo_DB_Service";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { routes } from "./routers/index_router";
import "dotenv/config";
import {
  SendOneEmailExample,
  SendMultipleEmailExample,
} from "./utils/SendEmail_ultil";

dotenv.config();
const app = express();
app.use(bodyParser.json());
routes(app);
app.set("view engine", "ejs");
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/";

const dbName = "mydatabase";

app.use(cookieParser());

const startServer = async () => {
  try {
    // MONGO_DB
    const mongodb = new ConnectDB(`${mongoUrl}${dbName}`);
    await mongodb.connect();
    await randomUser(2);
    // SERVER RUNNING PORT
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    SendOneEmailExample();
  } catch (error: any) {
    console.log("error", error);
  }
};

startServer();
