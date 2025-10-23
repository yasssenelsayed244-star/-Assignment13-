import { Router } from "express";
import { createComment, fetchComments } from "./comment.controller";
import { validateCreateComment } from "./comment.validation";

const router = Router();

router.post("/", validateCreateComment, createComment);
router.get("/:postId", fetchComments);

export default router;
