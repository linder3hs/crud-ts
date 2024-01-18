import express, { type Application } from "express";
import cors from "cors";
import { userRouter, productRouter, toolsRouter } from "./components";
import fileUpload from "express-fileupload";
import "dotenv/config";

const app: Application = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/tools", toolsRouter);

export default app;
