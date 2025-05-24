import { GraphQLFieldResolver } from "graphql";
import { MemberType } from "@prisma/client";
import { Context } from "../types/context.js";
import { isProfile } from "../services/guards.js";

export const memberTypeResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  memberTypes: async (_source, _args, context): Promise<MemberType[]> => {
    const memberTypes = await context.prisma.memberType.findMany();
    return memberTypes;
  },
  memberTypeById: async (_source, args: MemberType, context): Promise<MemberType | null> => {
    const { id } = args;
    return await context.prisma.memberType.findUnique({
      where: {
        id,
      },
    })
  },
  memberTypeBySourceId: async (source, _args: MemberType, context): Promise<MemberType | null> => {
    if (!isProfile(source)) {
      return null;
    }
    return await context.prisma.memberType.findUnique({
      where: {
        id: source.memberTypeId,
      },
    })
  },
};
