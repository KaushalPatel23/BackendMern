import { resisterUser } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(resisterUser);

export default router;
