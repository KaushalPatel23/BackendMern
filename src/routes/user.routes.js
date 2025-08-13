import { resisterUser } from "../controllers/user.controller.js";
import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields([ // here we multer which has fields method which take array of object , it is use to take files from frontend
        {
            name : "avatar",
            maxCount : 1 
        },
        {  
            name : "coverImage",
            maxCount : 1 
        }
    ]),
    resisterUser);

export default router;
