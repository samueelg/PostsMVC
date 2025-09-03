// src/Controller/User/CreateController.ts
import { type Request, type Response } from "express";
import User from "../../Model/User.js";

export default class CreateController {
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    public async execute(): Promise<void> {
        if (this.request.method === 'POST') {
            await this.processForm();
            return;
        }

        await this.showForm();
    }

    private async showForm(): Promise<void> {
        try {
            this.response.render("user/form.twig", {
                user: {},  // Usuário vazio para novo registro
                error: null
            });
        } catch (error) {
            console.error('Erro ao carregar formulário:', error);
            this.response.status(500).send('Erro ao carregar formulário');
        }
    }

    private async processForm(): Promise<void> {
        try {
            const { nome } = this.request.body;

            // Validação básica
            if (!nome || nome.trim().length === 0) {
                throw new Error('O nome é obrigatório');
            }

            // Cria o novo usuário
            await User.create(nome.trim());

            // Redireciona para a lista de usuários
            this.response.redirect('/user');
        } catch (error) {
            console.error('Erro ao criar usuário:', error);

            // Reexibe o formulário com os dados e erro
            this.response.render("user/form.twig", {
                user: this.request.body,
                error: error instanceof Error ? error.message : 'Erro ao criar usuário'
            });
        }
    }
}
