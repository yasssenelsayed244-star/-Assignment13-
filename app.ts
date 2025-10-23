import express from "express";
import userRoutes from "./modules/user/user.routes";
import postRoutes from "./modules/post/post.routes";
import commentRoutes from "./modules/comment/comment.routes";
import { errorHandler } from "./utils/errorHandling";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Error handler (last middleware)
app.use(errorHandler);

export default app;
