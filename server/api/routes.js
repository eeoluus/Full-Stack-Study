import express from "express";
import * as userController from "../controllers/userController.js";
import * as dreamController from "../controllers/dreamController.js";

const router = express.Router();

/* define http api to do crud */

/* USERS */

router.post("/user", userController.userCreate);
router.get("/user/:id", userController.userDetail);
router.patch("/user/:id", userController.userUpdate);
router.delete("/user/:id", userController.userDelete);

/* DREAMS */

router.post("/dream", dreamController.dreamCreate);
router.get("/dream/:id", dreamController.dreamDetail);
router.patch("/dream/:id", dreamController.dreamUpdate);
router.delete("/dream/:id", dreamController.dreamDelete);

export default router;