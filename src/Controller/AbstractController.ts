import { type Request, type Response } from 'express';

export abstract class AbstractController {
    protected request: Request;
    protected response: Response;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }

    /**
     * Executa a logica do controlador.
     *
     * @returns {Request} Retorna a requisição processada.
     * @abstract
     */
    public abstract execute(): Request;

    /**
     * Recupera os parâmetros da requisição.
     *
     * @returns {any} Retorna os parâmetros da requisição.
     * @abstract
     */
    public abstract getParams(): any;

    /**
     * Recupera o método HTTP da requisição.
     *
     * @return {string} Retorna o método HTTP da requisição.
     * @abstract
     */
    public abstract getMethod(): string;

}
