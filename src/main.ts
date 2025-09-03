// src/main.ts
import express, { type Request, type Response } from "express";
import IndexController from "./Controller/IndexController.js";
import PostController from "./Controller/PostController.js";
import {default as PostCreateController} from "./Controller/Post/CreateController.js";
import { default as UserCreateController } from "./Controller/User/CreateController.js";
import UserController from "./Controller/UserController.js";
// Importamos a biblioteca nativa 'path' do Node.js.
// Ela é usada para manipular caminhos de arquivos e diretórios
import path from "path";

// importamos e definimos o express
const app = express();
// configuramos o express para usar o twig como template engine
app.set("view engine", "twig");
app.set("twig options", {
    allow_async: true // Permite operações assíncronas
});

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Para sabermos o diretório atual, precisamos simular o __dirname.
// No Node.js moderno (quando usamos "type: module"), a variável __dirname não existe por padrão.
const __dirname = path.dirname(
    // Criamos uma nova URL baseada no caminho do arquivo atual.
    // 'import.meta.url' é uma propriedade nativa do ES Modules
    // que retorna a URL completa do arquivo em execução (ex.: file:///.../src/main.ts).
    new URL(import.meta.url).pathname
    // A partir dessa URL, pegamos apenas o 'pathname',
    // que representa o caminho físico do arquivo no sistema operacional.
);

// Usamos o método 'set' do Express para configurar a pasta de Views.
// 'app.set("views", ...)' define onde o Express vai procurar os templates (Twig, EJS, etc).
// Aqui concatenamos o diretório atual (__dirname) com a subpasta "/View".
app.set("views", __dirname + "/View");


// definimos uma primeira rota!
app.get("/",async (req: Request, res: Response) => {
    let indexController: IndexController = new IndexController(req, res);
    return indexController.execute();
});

app.get("/post", (req: Request, res: Response) => {
    let postController: PostController = new PostController(req, res);
    return postController.execute();
});

app.get("/post/create", (req: Request, res: Response) => {
    let postController: PostCreateController = new PostCreateController(req, res);
    return postController.execute();
});

app.post("/post/create", (req: Request, res: Response) => {
    let postController: PostCreateController = new PostCreateController(req, res);
    return postController.execute();
});

app.get("/user", async (req: Request, res: Response) => {
    const userController: UserController = new UserController(req, res);
    return userController.execute();
});


app.get("/user/create", (req: Request, res: Response) => {
    let createController: UserCreateController = new UserCreateController(req, res);
    return createController.execute();
});

app.post("/user/create", (req: Request, res: Response) => {
    let createController: UserCreateController = new UserCreateController(req, res);
    return createController.execute();
});

// definimos que o express deve ouvir a porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
