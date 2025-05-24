import { Profile } from "@prisma/client";
import { GraphQLFieldResolver } from "graphql";
import { Context } from "../types/context.js";
import { isUser } from "../services/guards.js";

export const profileResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  profiles: async (_source, _args, context): Promise<Profile[]> => {
    const profiles = await context.prisma.profile.findMany();
    return profiles;
  },
  profileById: async (_source, args: Profile, context): Promise<Profile | null> => {
    const { id } = args;
    return await context.prisma.profile.findUnique({
      where: {
        id,
      },
    })
  },
  profileByUserId: async (source, _args, context): Promise<Profile | null> => {
    if (!isUser(source)) {
      return null;
    }

    return await context.prisma.profile.findUnique({
      where: {
        userId: source.id,
      }
    });
  }
};
