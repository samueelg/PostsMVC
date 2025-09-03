// src/Controller/PostController.ts
import { type Request, type Response } from "express";
import Post from "../Model/Post.js";
import User from "../Model/User.js";

export default class UserController {
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public async execute(): Promise<void> {
        const users = await User.findAll();
        this.response.render(
            "user.twig",
            {users: users ?? []}
        );
    }
}
