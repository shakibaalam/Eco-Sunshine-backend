// imports
import { Router } from "express";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js";
import {
  UpdateEvent,
  createAddEvent,
  deleteEvent,
  getAllAddEvent,
} from "../controllers/event/eventControllers.js";
import {
  deleteRegEvent,
  getAllRegEventUser,
  getRegEvent,
  getRegEventUser,
  registerEvent,
  updateRegEvent,
} from "../controllers/event/eventRegControllers.js";
// router
const router = Router();

// blog router
router.post("/create-event", checkAdmin, createAddEvent);
router.delete("/delete-event/:id", checkAdmin, deleteEvent);
router.patch("/update-event/:id", checkAdmin, UpdateEvent);
router.get("/get-event/:id", checkAuthUser, getAllAddEvent);
router.get("/get-event", getAllAddEvent);
// blog router
router.post("/create-event-reg", checkAuthUser, registerEvent);
router.delete("/delete-reg-event/:id", checkAuthUser, deleteRegEvent);
router.patch("/update-reg-event/:id", checkAuthUser, updateRegEvent);
router.get("/get-reg-event/:id", checkAuthUser, getRegEventUser);
router.get("/get-reg-event", checkAuthUser, getRegEventUser);
router.get("/get-allReg-event", checkAdmin, getAllRegEventUser);

// exporting
export default router;
