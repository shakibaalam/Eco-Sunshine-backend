// imports
import { Router } from "express";
import { UpdateBlog, createBlog, deleteBlog, getAllBlog } from "../controllers/blog/blogControllers.js";
import { checkAuthUser, checkAdmin } from "../middleware/authMiddleware.js"
// router
const router = Router();

// blog router
router.post("/create-blog",checkAdmin,  createBlog);
router.delete("/delete-blog/:id",checkAdmin,  deleteBlog);
router.patch("/update-blog/:id",checkAdmin,  UpdateBlog);
router.get("/get-blog/:id",checkAuthUser, getAllBlog );
router.get("/get-blog",checkAuthUser, getAllBlog);

// exporting
export default router;
