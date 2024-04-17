import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import Dream from "../models/dream.js"
import asyncHandler from "express-async-handler";

export const userCreate = [
    
    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Username must be specified")
        .isAlphanumeric()
        .withMessage("Username has non-alphanumeric characters"),
    body("age", "Age must be between 1 and 99 years")
        .trim()
        .isInt({ min: 1, max: 99 })
        .escape(),

    asyncHandler(async (req, res, next) => {
  
        const errors = validationResult(req);

        const user = new User({
            name: req.body.name,
            age: req.body.age
        });
        
        if (!errors.isEmpty()) {
            res.status(400).json({
                user: user,
                errors: errors.array()
            });
            return;
        } else {
            await user.save();
            res.status(201).json({
                user: user
            });
        }
    })
]

export const userDetail = asyncHandler(async (req, res, next) => {

    const [user, allDreamsByUser] = await Promise.all([
        User.findById(req.params.id).exec(),
        Dream.find({ dreamer: req.params.id }, "summary quality").exec()
    ]);

    /* Check in other handlers that assume an existing user? */
    if (user === null) {
        const err = new Error("User not found");
        err.status = 404;
        return next(err);
    }

    res.status(200).json({
        user: user,
        userDreams: allDreamsByUser
    });
});

export const userUpdate = [

    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Username must be specified")
        .isAlphanumeric()
        .withMessage("Username has non-alphanumeric characters"),
    body("age", "Age must be between 1 and 99 years")
        .trim()
        .isInt({ min: 1, max: 99 })
        .escape(),

    asyncHandler(async (req, res, next) => {
    
        const errors = validationResult(req);

        const user = new User({
            name: req.body.name,
            age: req.body.age,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.status(400).json({
                user: user,
                errors: errors.array()
            });
            return;
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                user, 
                { runValidators: true, new: true }
            );
            res.status(200).json({
                user: user
            });
        }
    })
];

export const userDelete = asyncHandler(async (req, res, next) => {

    const [user, allDreamsByUser] = await Promise.all([
        User.findById(req.params.id).exec(),
        Dream.find({ dreamer: req.params.id }, "summary quality").exec()
    ]);

    if (allDreamsByUser.length > 0) {
        res.status(400).json({
            user: user,
            userDreams: allDreamsByUser
        });
        return;
    } else {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted, you fucking prick");
    }

});