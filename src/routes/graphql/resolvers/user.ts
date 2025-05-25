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
  createUser: async (_source, args: { dto: Pick<User, 'balance' | 'name'>}, context): Promise<User> => {
    const { dto } = args;
    return await context.prisma.user.create({
      data: dto
    })
  },
  changeUser: async (_source, args: { id: string, dto: Pick<User, 'name' | 'balance'>}, context): Promise<User> => {
    const { id, dto } = args;
    return await context.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    })
  },
  deleteUser: async (_source, args: { id: string }, context): Promise<string> => {
    const { id } = args;
    await context.prisma.user.delete({
      where: {
        id,
      }
    });
    return 'User has been deleted';
  },
  subscribeTo: async (_source, args: { userId: string; authorId: string }, context): Promise<string> => {
    const { userId, authorId } = args;
    await context.prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: userId,
        authorId,
      }
    });
    return 'User has been subscribed to author';
  },
  unsubscribeFrom: async (_source, args: { userId: string; authorId: string }, context): Promise<string> => {
    const { userId, authorId } = args;
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId,
        },
      }
    });
    return 'User has been unsubscribed from author';
  },
};
