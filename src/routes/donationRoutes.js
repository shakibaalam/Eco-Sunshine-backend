// imports
import { Router } from "express";
import { UpdateProducts, createProducts, deleteProducts, getAllProducts } from "../controllers/donation/donationControllers.js";
import { createCDonation, getAllCDonation } from "../controllers/donation/createDonationControllers.js";
import { checkAuthUser,  checkSuperAdmin, checkAdmin } from "../middleware/authMiddleware.js"
// router
const router = Router();

// product router
router.post("/create-donation", createProducts, checkAdmin);
router.delete("/delete-donation", deleteProducts, checkAdmin);
router.patch("/update-donation", UpdateProducts, checkAdmin);
router.post("/get-donation", getAllProducts, checkAuthUser);
router.get("/get-donation/:id", getAllProducts, checkAuthUser);

// create donation
router.post("/create-user-donation", createCDonation, checkAuthUser);
router.post("/get-user-donation", getAllCDonation, checkAuthUser);
router.get("/get-user-donation/:id", getAllCDonation, checkAuthUser);

// exporting
export default router;