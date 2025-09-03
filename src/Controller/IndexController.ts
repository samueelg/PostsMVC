// src/Controller/IndexController.ts
import { type Request, type Response } from "express";

export default class IndexController {
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public execute(): void {
        this.response.render("index.twig", {
            titulo: "Meu Blog",
            conteudo: "Seja bem-vindo ao meu blog! Aqui você encontrará artigos interessantes sobre diversos temas.",
        });
    }
}
