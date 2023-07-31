// imports
import { Router } from "express";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
import { UpdateCompaign, createCompaign, deleteCompaign, getAllCompaign } from "../controllers/campaign/campaignControllers.js";
// router
const router = Router();

// product router
router.post("/create-campaign",checkAdmin, createCompaign );
router.delete("/delete-campaign/:id", checkAdmin, deleteCompaign);
router.patch("/update-campaign/:id",checkAdmin, UpdateCompaign);
router.get("/get-campaign", getAllCompaign);
router.get("/get-campaign/:id",checkAuthUser, getAllCompaign);



// exporting
export default router;