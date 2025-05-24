import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Profile } from "@prisma/client";
import { Context } from "./context.js";
import { UUIDType } from "./uuid.js";
import { MemberObjectType } from "./memberType.js";
import { memberTypeResolvers } from "../resolvers/memberType.js";

export const ProfileObjectType = new GraphQLObjectType<Profile, Context>({
  name: 'ProfileType',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberType: {
      type: new GraphQLNonNull(MemberObjectType),
      resolve: memberTypeResolvers.memberTypeBySourceId,
    }
  }
});

export const ProfilesObjectType = new GraphQLList(ProfileObjectType);
