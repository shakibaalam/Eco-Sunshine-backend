// imports
import { Router } from "express";
import { UpdateProducts, createProducts, deleteProducts, getAllProducts } from "../controllers/donation/donationControllers.js";
import { UpdateAddToCart, createAddToCart, deleteAddToCart, getAllAddToCart, getAllPay } from "../controllers/products/addToCartControllers.js";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
import { customarStripeAccount, paymentRecive } from "../controllers/payment/paymentControllers.js";
// router
const router = Router();

// add product router
router.post("/create-product", checkAdmin, createProducts);
router.delete("/delete-product/:id", checkAdmin, deleteProducts);
router.patch("/update-product/:id", checkAdmin, UpdateProducts);
router.get("/get-product", checkAuthUser, getAllProducts);
router.get("/get-product/:id", checkAuthUser, getAllProducts);

// add to cart router
router.post("/add-to-cart/:id", checkAuthUser, createAddToCart);
router.delete("/delete-to-cart/:id", checkAuthUser, deleteAddToCart);
router.patch("/update-to-cart/:id", checkAuthUser, UpdateAddToCart);
router.get("/get-to-cart", checkAuthUser, getAllAddToCart);
router.get("/get-to-cart/:id", checkAuthUser, getAllAddToCart);

router.post("/create-customar",checkAuthUser, customarStripeAccount);
router.post("/payment-recive",checkAuthUser, paymentRecive);
router.get("/get-confirm-pay-product",checkAdmin, getAllPay);
// exporting
export default router;
