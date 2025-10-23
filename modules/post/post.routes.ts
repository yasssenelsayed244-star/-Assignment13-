import { Router } from "express";
import { addPost, fetchPosts } from "./post.controller";
import { validateCreatePost } from "./post.validation";
const router = Router();

router.post("/", validateCreatePost, addPost);
router.get("/", fetchPosts);

export default router;
