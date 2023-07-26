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
router.post("/add-to-cart", createAddToCart);
router.delete("/delete-to-cart", deleteAddToCart);
router.patch("/update-to-cart", UpdateAddToCart);
router.post("/get-to-cart", getAllAddToCart);
router.get("/get-to-cart", getAllAddToCart);

// exporting
export default router;