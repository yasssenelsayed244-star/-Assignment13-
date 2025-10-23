import CommentModel from "./comment.model";
import { CreateCommentDTO } from "./comment.dto";

export const addComment = async (dto: CreateCommentDTO) => {
  const comment = await CommentModel.create(dto);
  return comment;
};

export const getCommentsByPost = async (postId: string) => {
  const comments = await CommentModel.find({ postId }).populate("author", "name email");
  return comments;
};
