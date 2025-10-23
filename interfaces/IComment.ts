export interface IComment {
  _id?: string;
  postId: string;
  author: string; // user id
  content: string;
  createdAt?: Date;
}
