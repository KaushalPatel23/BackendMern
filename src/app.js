import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORSORIGIN,
    credentials: true, // konti origin chi request cors n accept keli pahije;
  })
); //config the core

app.use(express.json({ limit: "20kB" })); // json format madhe input gheu

app.use(express.urlencoded()); //url varun data aala tyale encode kara

app.use(express.static("public"));

app.use(cookieParser());

// import router

import userRouter from "./routes/user.routes.js";

//router declaration

app.use("/api/v1/users", userRouter); //http://localhost:5000/api/v1/users/register

export { app };
