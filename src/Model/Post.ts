// src/Model/Post.ts
import Database from './Database.js';
import type { Post as PrismaPost } from '../generated/prisma/client.js';

export default class Post {
    public id: number;
    public titulo: string;
    public conteudo: string;
    public userId: number;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(id: number, titulo: string, conteudo: string, userId: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Método estático para criar um novo post
    public static async create(titulo: string, conteudo: string, userId: number): Promise<Post> {
        const prismaPost = await Database.prisma.post.create({
            data: {
                titulo,
                conteudo,
                userId
            }
        });
        return Post.fromPrisma(prismaPost);
    }

    // Método estático para buscar todos os posts
    public static async findAll(): Promise<Post[]> {
        const posts = await Database.prisma.post.findMany();
        return posts.map((post: PrismaPost) => Post.fromPrisma(post));
    }

    // Método estático para buscar um post pelo ID
    public static async findById(id: number): Promise<Post | null> {
        const post = await Database.prisma.post.findUnique({
            where: { id }
        });
        return post ? Post.fromPrisma(post) : null;
    }

    // Método para atualizar um post
    public async update(data: { titulo?: string; conteudo?: string }): Promise<Post> {
        const updatedPost = await Database.prisma.post.update({
            where: { id: this.id },
            data
        });
        return Post.fromPrisma(updatedPost);
    }

    // Método para deletar um post
    public async delete(): Promise<void> {
        await Database.prisma.post.delete({
            where: { id: this.id }
        });
    }

    // Método auxiliar para converter um Post do Prisma para nossa classe Post
    private static fromPrisma(prismaPost: PrismaPost): Post {
        return new Post(
            prismaPost.id,
            prismaPost.titulo,
            prismaPost.conteudo || '',
            prismaPost.userId,
            prismaPost.createdAt,
            prismaPost.updatedAt
        );
    }
}
