import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from "graphql";
import { MemberTypeId } from "./memberType.js";

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeId,
    },
  }
})