import { Request, Response } from "express";
import { createPost, getAllPosts } from "./post.service";
import { createdResponse, successResponse, errorResponse } from "../../utils/response";

export const addPost = async (req: Request, res: Response) => {
  try {
    const post = await createPost(req.body);
    return createdResponse(res, post, "Post created");
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const fetchPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    return successResponse(res, posts, "Posts fetched");
  } catch (err) {
    return errorResponse(res, err);
  }
};
