import { Profile } from "@prisma/client";
import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Context } from "./context.js";
import { UUIDType } from "./uuid.js";
import { MemberTypeId } from "./memberType.js";

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
      type: new GraphQLNonNull(MemberTypeId),
    }
  }
});

export const ProfilesObjectType = new GraphQLList(ProfileObjectType);
