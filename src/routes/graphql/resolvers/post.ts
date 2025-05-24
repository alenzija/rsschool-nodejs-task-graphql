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
    }
};
