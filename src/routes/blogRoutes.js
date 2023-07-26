// imports
import { Router } from "express";
import { UpdateBlog, createBlog, deleteBlog, getAllBlog } from "../controllers/blog/blogControllers.js";

// router
const router = Router();

// blog router
router.post("/create-blog", createBlog);
router.delete("/delete-blog", deleteBlog);
router.patch("/update-blog", UpdateBlog);
router.get("/get-blog/:id", getAllBlog);
router.get("/get-blog", getAllBlog);

// exporting
export default router;
