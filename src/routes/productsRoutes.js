// imports
import { Router } from "express";

import { UpdateAddToCart, createAddToCart, deleteAddToCart, getAllAddToCart, getAllPay } from "../controllers/products/addToCartControllers.js";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
import { customarStripeAccount, paymentRecive } from "../controllers/payment/paymentControllers.js";
import { UpdateProduct, createProduct, deleteProduct, getAllProduct } from "../controllers/products/productsControllers.js";
// router
const router = Router();

// add product router
router.post("/create-product", checkAdmin, createProduct);
router.delete("/delete-product/:id", checkAdmin, deleteProduct);
router.patch("/update-product/:id", checkAdmin, UpdateProduct);
router.get("/get-product", getAllProduct);
router.get("/get-product/:id", checkAuthUser, getAllProduct);

// add to cart router
router.post("/add-to-cart/:id", checkAuthUser, createAddToCart);
router.delete("/delete-to-cart/:id", checkAuthUser, deleteAddToCart);
router.patch("/update-to-cart/:id", checkAuthUser, UpdateAddToCart);
router.get("/get-to-cart", checkAuthUser, getAllAddToCart);
router.get("/get-to-cart/:id", checkAuthUser, getAllAddToCart);

router.post("/create-customer",checkAuthUser, customarStripeAccount);
router.post("/payment-receive",checkAuthUser, paymentRecive);
router.get("/get-confirm-pay-product",checkAuthUser, getAllPay);
// exporting
export default router;
