// src/Controller/PostController.ts
import { type Request, type Response } from "express";
import Post from "../Model/Post.js";

export default class PostController {
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public async execute(): Promise<void> {
        const posts = await Post.findAll();
        this.response.render(
            "post.twig",
            {posts: posts ?? []}
        );
    }
}
