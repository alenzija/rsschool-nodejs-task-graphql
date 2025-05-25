import { GraphQLFieldResolver } from "graphql";
import { Post } from "@prisma/client";
import { Context } from "../types/context.js";
import { isUser } from "../services/guards.js";

export const postResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  posts: async (_source, _args, context): Promise<Post[]> => {
    const posts = await context.prisma.post.findMany();
    return posts;
  },
  postById: async (_source, args: Post, context): Promise<Post | null> => {
    const { id } = args;
    return await context.prisma.post.findUnique({
      where: {
        id,
      },
    })
  },
  postsByUserId: async (source, _args, context): Promise<Post[] | null> => {
    if (!isUser(source)) {
      return null
    }
    return await context.prisma.post.findMany({
      where: {
        authorId: source.id,
      }
    })
  },
  createPost: async (_source, args: { dto: Pick<Post, 'title' | 'content' | 'authorId'>}, context): Promise<Post> => {
    const { dto } = args;
    return await context.prisma.post.create({
      data: dto,
    })
  },
  changePost: async (_source, args: { id: string, dto: Pick<Post, 'title' | 'content'>}, context): Promise<Post> => {
    const { id, dto } = args;
    return await context.prisma.post.update({
      where: {
        id,
      },
      data: dto,
    })
  },
  deletePost: async (_source, args: { id: string }, context): Promise<string> => {
    const { id } = args;
    await context.prisma.post.delete({
      where: {
        id,
      }
    });
    return 'Post has been deleted';
  }
};
