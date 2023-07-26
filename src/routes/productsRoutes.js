// imports
import { Router } from "express";
import { UpdateProducts, createProducts, deleteProducts, getAllProducts } from "../controllers/donation/donationControllers.js";
import { UpdateAddToCart, createAddToCart, deleteAddToCart, getAllAddToCart } from "../controllers/products/addToCartControllers.js";

// router
const router = Router();

// add product router
router.post("/create-product", createProducts);
router.delete("/delete-product", deleteProducts);
router.patch("/update-product", UpdateProducts);
router.post("/get-product", getAllProducts);
router.get("/get-product/:id", getAllProducts);

// add to cart router
router.post("/create-product", createAddToCart);
router.delete("/delete-product", deleteAddToCart);
router.patch("/update-product", UpdateAddToCart);
router.post("/get-product", getAllAddToCart);
router.get("/get-product/:id", getAllAddToCart);

// exporting
export default router;