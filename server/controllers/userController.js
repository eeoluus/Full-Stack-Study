import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

export const userCreate = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user create")
});

export const userDetail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user detail")
});

export const userUpdate = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user update")
});

export const userDelete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user delete")
});