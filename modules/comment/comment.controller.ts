import { Request, Response } from "express";
import { addComment, getCommentsByPost } from "./comment.service";
import { createdResponse, successResponse, errorResponse } from "../../utils/response";

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await addComment(req.body);
    return createdResponse(res, comment, "Comment added");
  } catch (err) {
    return errorResponse(res, err);
  }
};

export const fetchComments = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const comments = await getCommentsByPost(postId);
    return successResponse(res, comments, "Comments fetched");
  } catch (err) {
    return errorResponse(res, err);
  }
};
