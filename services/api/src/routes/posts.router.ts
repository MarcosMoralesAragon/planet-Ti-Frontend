import { Request, Response, Router } from "express";
import { PostsController } from "@app/posts/infrastructure";

const postsRouter: Router = Router();
const postsController = new PostsController();

postsRouter.get("/api/posts", async (req: Request, res: Response) => {
  postsController.findAllPosts(req, res);
});

export default postsRouter;
