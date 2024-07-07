import dotenv from "dotenv";
import router from "./router/user.router.js";
import express from "express"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/user", router);

export {app};