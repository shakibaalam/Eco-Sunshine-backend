// imports
import { Router } from "express";
import { UpdateDonationcreateDonation, createDonation,  deleteDonationcreateDonation,  getAllDonationcreateDonation } from "../controllers/donation/donationControllers.js";
import { createCDonation, getAllCDonation } from "../controllers/donation/createDonationControllers.js";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
// router
const router = Router();

// product router
router.post("/create-donation",checkAdmin, createDonation );
router.delete("/delete-donation/:id", checkAdmin, deleteDonationcreateDonation);
router.patch("/update-donation/:id",checkAdmin, UpdateDonationcreateDonation);
router.get("/get-donation",checkAuthUser, getAllDonationcreateDonation);
router.get("/get-donation/:id",checkAuthUser, getAllDonationcreateDonation);

// create donation
router.post("/create-user-donation/:id",checkAuthUser, createCDonation);
router.get("/get-user-donation",checkAuthUser, getAllCDonation);
router.get("/get-user-donation/:id",checkAuthUser, getAllCDonation);

// exporting
export default router;