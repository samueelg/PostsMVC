// src/Controller/Post/CreateController.ts
import { type Request, type Response } from "express";
import Post from "../../Model/Post.js";
import User from "../../Model/User.js";

export default class CreateController {
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public async execute(): Promise<void> {
        // Se for POST, processa o formulário
        if (this.request.method === 'POST') {
            await this.processForm();
            return;
        }

        // Se for GET, exibe o formulário
        await this.showForm();
    }

    private async showForm(): Promise<void> {
        try {
            // Busca todos os usuários para o select
            const users = await User.findAll();

            this.response.render("post/form.twig", {
                users,
                post: {} // Post vazio para novo registro
            });
        } catch (error) {
            console.error('Erro ao carregar formulário:', error);
            this.response.status(500).send('Erro ao carregar formulário');
        }
    }

    private async processForm(): Promise<void> {
        try {
            const { titulo, conteudo, userId } = this.request.body;

            // Validações básicas
            if (!titulo || !conteudo || !userId) {
                throw new Error('Todos os campos são obrigatórios');
            }

            // Cria o novo post
            await Post.create(
                titulo,
                conteudo,
                parseInt(userId, 10)
            );

            // Redireciona para a lista de posts
            this.response.redirect('/post');
        } catch (error) {
            console.error('Erro ao criar post:', error);

            // Reexibe o formulário com os dados e erro
            const users = await User.findAll();
            this.response.render("post/form.twig", {
                users,
                post: this.request.body,
                error: error instanceof Error ? error.message : 'Erro ao criar post'
            });
        }
    }
}
