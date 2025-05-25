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
  },
  createProfile: async (_source, args: { dto: Pick<Profile, 'isMale' | 'memberTypeId' | 'userId' | 'yearOfBirth'>}, context): Promise<Profile> => {
    const { dto } = args;
    return await context.prisma.profile.create({
      data: dto,
    })
  },
  changeProfile: async (_source, args: { id: string, dto: Pick<Profile, 'isMale' | 'memberTypeId' | 'yearOfBirth'>}, context): Promise<Profile> => {
    const { id, dto } = args;
    return await context.prisma.profile.update({
      where: {
        id,
      },
      data: dto,
    })
  },
  deleteProfile: async (_source, args: { id: string }, context): Promise<string> => {
    const { id } = args;
    await context.prisma.profile.delete({
      where: {
        id,
      }
    });
    return 'Profile has been deleted';
  }
};
