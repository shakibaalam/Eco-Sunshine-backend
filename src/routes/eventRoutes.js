// imports
import { Router } from "express";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
import { UpdateEvent, createAddEvent, deleteEvent, getAllAddEvent } from "../controllers/event/eventControllers.js";
// router
const router = Router();

// blog router
router.post("/create-event",checkAdmin,  createAddEvent);
router.delete("/delete-event/:id",checkAdmin,  deleteEvent);
router.patch("/update-event/:id",checkAdmin,  UpdateEvent);
router.get("/get-event/:id",checkAuthUser, getAllAddEvent );
router.get("/get-event",checkAuthUser, getAllAddEvent);

// exporting
export default router;