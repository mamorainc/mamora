import cors from "cors";
import express from "express";
import actionRouter from "./router/action.router";
import userRouter from "./router/user.router";
import { configDotenv } from "dotenv";
import cookieParser from 'cookie-parser';

configDotenv();


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Hello welcome to mamora world!",
  });
});

app.use("/api/v1/action", actionRouter);
app.use("/api/v1/user", userRouter);


// Catch-all for non-existent routes
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "API route not found",
  });
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`app listening on http://localhost:9000`);
});
