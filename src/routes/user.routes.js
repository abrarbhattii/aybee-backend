import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router =  Router();

// user route will pass control to register
// https:localhost:8000:/api/v1/users/register
router.route("/register").post(registerUser)


export default router;