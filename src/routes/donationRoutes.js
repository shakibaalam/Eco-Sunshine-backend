// imports
import { Router } from "express";
import { UpdateProducts, createProducts, deleteProducts, getAllProducts } from "../controllers/donation/donationControllers.js";
import { createCDonation, getAllCDonation } from "../controllers/donation/createDonationControllers.js";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
// router
const router = Router();

// product router
router.post("/create-donation",checkAdmin, createProducts );
router.delete("/delete-donation/:id", checkAdmin, deleteProducts);
router.patch("/update-donation/:id",checkAdmin, UpdateProducts);
router.get("/get-donation",checkAuthUser, getAllProducts);
router.get("/get-donation/:id",checkAuthUser, getAllProducts);

// create donation
router.post("/create-user-donation/:id",checkAuthUser, createCDonation);
router.get("/get-user-donation",checkAuthUser, getAllCDonation);
router.get("/get-user-donation/:id",checkAuthUser, getAllCDonation);

// exporting
export default router;