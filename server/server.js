import compression from "compression";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import express, { urlencoded } from "express";
/* import helmet from "helmet"; */
import logger from "morgan";
import mongoose from "mongoose";
/* import rateLimit from "express-rate-limit"; */
import router from "./api/routes.js";

const app = express();

/* middleware setup */
// still missing helmet and rate limiter

app.use(logger("dev"));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

/* api setup */

app.use("/", router);

/* catch 404 and forward to error handler */

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.messageM
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.send("error");
});

mongoose.set("strictQuery", false);

const mongoDB = process.env.ATLAS_URI;

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect(mongoDB);
    console.log("Successfully connected to MongoDB!")
    console.log(`API available at PORT: ${process.env.PORT}`)
};

export default app;