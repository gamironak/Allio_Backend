import express from "express";
import dotenv from "dotenv";
import userRouter from "./Routes/user.route.js";
import uploadRouter from "./Routes/upload.route.js";
import newsRouter from "./Routes/news.route.js";
import getStreamRouter from "./Routes/getstream.route.js";
import qrcodeRouter from "./Routes/generate.route.js";
import aiRouter from "./Routes/aiAssistant.route.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());

app.use("/api/user", express.json(), userRouter);

app.use("/api/qrcode", express.json(), qrcodeRouter);

app.use("/api/ai", express.json(), aiRouter);

app.use("/api/qrcode", express.json(), qrcodeRouter);

app.use("/api", uploadRouter);

app.use("/api/news", express.json(), newsRouter);

app.use("/api/getstream", express.json(), getStreamRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
