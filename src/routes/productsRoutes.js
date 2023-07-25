// imports
import { Router } from "express";
import { UpdateProducts, createProducts, deleteProducts, getAllProducts } from "../controllers/donation/donationControllers.js";

// router
const router = Router();

// user register router
router.post("/create-product", createProducts);
router.delete("/delete-product", deleteProducts);
router.patch("/update-product", UpdateProducts);
router.post("/get-product", getAllProducts);
router.get("/get-product/:id", getAllProducts);

// exporting
export default router;