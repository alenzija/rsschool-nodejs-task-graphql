import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType } from "@prisma/client";
import { Context } from "./context.js";

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'BASIC',
    },
    BUSINESS: {
      value: 'BUSINESS',
    },
  },
});

export const MemberObjectType = new GraphQLObjectType<MemberType, Context>({
  name: 'MemberType',
  fields: {
    id: {
      type: new GraphQLNonNull(MemberTypeId),
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

export const MembersObjectType = new GraphQLList(MemberObjectType);
