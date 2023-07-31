// imports
import { Router } from "express";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
import { UpdateEvent, createAddEvent, deleteEvent, getAllAddEvent } from "../controllers/event/eventControllers.js";
import { deleteRegEvent, getRegEvent, registerEvent, updateRegEvent } from "../controllers/event/eventRegControllers.js";
// router
const router = Router();

// blog router
router.post("/create-event",checkAdmin,  createAddEvent);
router.delete("/delete-event/:id",checkAdmin,  deleteEvent);
router.patch("/update-event/:id",checkAdmin,  UpdateEvent);
router.get("/get-event/:id",checkAuthUser, getAllAddEvent );
router.get("/get-event",checkAuthUser, getAllAddEvent);
// blog router
router.post("/create-event",checkAuthUser,  registerEvent);
router.delete("/delete-event/:id",checkAuthUser,  deleteRegEvent);
router.patch("/update-event/:id",checkAuthUser,  updateRegEvent);
router.get("/get-event/:id",checkAuthUser, getRegEvent );
router.get("/get-event",checkAdmin, getRegEvent);

// exporting
export default router;