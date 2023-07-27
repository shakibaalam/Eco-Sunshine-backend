// imports
import { Router } from "express";
import { getAllUser, login, register, updateUserRole } from "../controllers/userControllers.js";
import {  checkAdmin } from "../middleware/authMiddleware.js"
// router
const router = Router();

// user register router
router.post("/register", register);
router.post("/login", login);
router.get('/get-user', checkAdmin, getAllUser)
router.patch('/update-user-role/:id', checkAdmin, updateUserRole)

// exporting
export default router;
