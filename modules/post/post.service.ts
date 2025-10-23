import PostModel from "./post.model";
import { CreatePostDTO } from "./post.dto";

export const createPost = async (dto: CreatePostDTO) => {
  const post = await PostModel.create(dto);
  return post;
};

export const getAllPosts = async () => {
  const posts = await PostModel.find().populate("author", "name email");
  return posts;
};
