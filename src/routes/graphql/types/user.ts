import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { User } from "@prisma/client";
import { Context } from "./context.js";
import { ProfileObjectType, ProfilesObjectType } from "./profile.js";

export const UserObjectType = new GraphQLObjectType<User, Context>({
  name: 'UserType',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    profile: {
      type: new GraphQLNonNull(ProfileObjectType),
    },
    posts: {
      type: new GraphQLNonNull(ProfilesObjectType),
    },
    // userSubscribedTo: {
    //   type: new GraphQLNonNull(UsersObjectType),
    // },
    // subscribedToUser: {
    //   type: new GraphQLNonNull(UsersObjectType),
    // }
  }
});

export const UsersObjectType = new GraphQLList(UserObjectType);
