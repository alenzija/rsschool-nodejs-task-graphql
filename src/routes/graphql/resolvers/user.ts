import { GraphQLFieldResolver } from "graphql";
import { User } from "@prisma/client";
import { Context } from "../types/context.js";
import { isUser } from "../services/guards.js";

export const userResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  users: async (_source, _args, context): Promise<User[]> => {
    const users = await context.prisma.user.findMany();
    return users;
  },
  userById: async (_source, args: User, context): Promise<User | null>  => {
    const { id } = args;
    return await context.prisma.user.findUnique({
      where: {
        id,
      },
    })
  },
  userSubscribedTo: async (source, _args, context): Promise<User[] | null> => {
    if (!isUser(source)) {
      return null;
    };

    const subscribersOnAuthors = await context.prisma.subscribersOnAuthors.findMany({
      where: {        
        subscriberId: source.id,   
      },
    });

    return await context.prisma.user.findMany({
      where: {
        id: {
          in: subscribersOnAuthors.map(({authorId}) => authorId),
        }  
      },
    });
  },
  subscribedToUser: async function (source, _args, context): Promise<User[] | null> {
    if (!isUser(source)) {
      return null;
    }
    const subscribersOnAuthors = await context.prisma.subscribersOnAuthors.findMany({
      where: {        
        authorId: source.id,   
      },
    });

    return await context.prisma.user.findMany({
      where: {
        id: {
          in: subscribersOnAuthors.map(({subscriberId}) => subscriberId),
        }  
      },
    });
  },
};
