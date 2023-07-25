// imports
import { Router } from "express";
import { login, register } from "../controllers/userControllers.js";

// router
const router = Router();

// user register router
router.post("/register", register);
router.post("/login", login);

// exporting
export default router;
