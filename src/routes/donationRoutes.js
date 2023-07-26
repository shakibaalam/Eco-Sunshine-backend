// imports
import { Router } from "express";
import { UpdateProducts, createProducts, deleteProducts, getAllProducts } from "../controllers/donation/donationControllers.js";
import { createCDonation, getAllCDonation } from "../controllers/donation/createDonationControllers.js";

// router
const router = Router();

// product router
router.post("/create-product", createProducts);
router.delete("/delete-product", deleteProducts);
router.patch("/update-product", UpdateProducts);
router.post("/get-product", getAllProducts);
router.get("/get-product/:id", getAllProducts);

// create donation
router.post("/create-product", createCDonation);
router.post("/get-product", getAllCDonation);
router.get("/get-product/:id", getAllCDonation);

// exporting
export default router;