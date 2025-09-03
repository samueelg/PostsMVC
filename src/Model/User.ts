// src/Model/User.ts
import Database from './Database.js';
import type { User as PrismaUser } from '../generated/prisma/client.js';
import Post from './Post.js';

export default class User {
    public id: number;
    public nome: string;
    public posts: Post[];

    constructor(id: number, nome: string, posts: Post[] = []) {
        this.id = id;
        this.nome = nome;
        this.posts = posts;
    }

    public static async create(nome: string): Promise<User> {
        const prismaUser = await Database.prisma.user.create({
            data: {
                nome
            },
            include: {
                posts: true
            }
        });
        return User.fromPrisma(prismaUser);
    }

    public static async findAll(): Promise<User[]> {
        const users = await Database.prisma.user.findMany({
            include: {
                posts: true
            }
        });
        return users.map((user: PrismaUser & { posts: Post[] }) => User.fromPrisma(user));
    }

    public static async findById(id: number): Promise<User | null> {
        const user = await Database.prisma.user.findUnique({
            where: { id },
            include: {
                posts: true
            }
        });
        return user ? User.fromPrisma(user) : null;
    }

    public async update(data: { nome: string }): Promise<User> {
        const updatedUser = await Database.prisma.user.update({
            where: { id: this.id },
            data,
            include: {
                posts: true
            }
        });
        return User.fromPrisma(updatedUser);
    }

    public async delete(): Promise<void> {
        await Database.prisma.user.delete({
            where: { id: this.id }
        });
    }

    private static fromPrisma(prismaUser: PrismaUser & { posts?: any[] }): User {
        const posts = (prismaUser.posts || []).map((post: any) => new Post(
            post.id,
            post.titulo,
            post.conteudo || '',
            post.userId,
            post.createdAt,
            post.updatedAt
        ));

        return new User(
            prismaUser.id,
            prismaUser.nome,
            posts
        );
    }
}
