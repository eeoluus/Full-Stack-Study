import { body, validationResult } from "express-validator";
import Dream from "../models/dream.js";
import asyncHandler from "express-async-handler";

export const dreamCreate = [
    
    body("summary", "Summary must be specified.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("quality", "You must specify the type of the dream.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("dreamer", "Dream must have a valid dreamer.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        
        const errors = validationResult(body);

        const dream = new Dream({
            summary: req.body.summary,
            quality: req.body.quality,
            dreamer: req.body.dreamer
        });

        if (!errors.isEmpty()) {
            res.status(400).json({
                dream: dream,
                errors: errors.array()
            });
            return;
        } else {
            await dream.save();
            res.status(201).json({
                dream: dream
            });
        }
    }
)];

export const dreamDetail = asyncHandler(async (req, res, next) => {
    
    const dream = await Dream.findById(req.params.id).populate("dreamer").exec();

    console.log(dream);

    if (dream === null) {
        const err = new Error("Dream not found");
        err.status = 404;
        return next(err);
    } 
    
    res.status(200).json({
        dream: dream
    });
});

export const dreamUpdate = [
    
    body("summary", "Summary must be specified.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("quality", "You must specify the type of the dream.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("dreamer", "Dream must have a valid dreamer.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
    
        const errors = validationResult(body);

        const dream = new Dream({
            summary: req.body.summary,
            quality: req.body.quality,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.status(400).json({
                dream: dream,
                errors: errors.array()
            });
            return;
        } else {
            const updatedDream = await Dream.findByIdAndUpdate(
                req.params.id, 
                dream, 
                { runValidators: true, new: true }
            );
            res.status(200).json({
                dream: dream
            });
        }
    })
];

export const dreamDelete = asyncHandler(async (req, res, next) => {
    
    await Dream.findByIdAndDelete(req.params.id);
    res.status(200).send("Congrats, deleted.");
});