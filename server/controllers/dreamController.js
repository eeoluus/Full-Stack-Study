import { body, validationResult } from "express-validator";
import Dream from "../models/dream.js";
import asyncHandler from "express-async-handler";

export const dreamCreate = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: dream create")
});

export const dreamDetail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: dream detail")
});

export const dreamUpdate = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: dream update")
});

export const dreamDelete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: dream delete")
});