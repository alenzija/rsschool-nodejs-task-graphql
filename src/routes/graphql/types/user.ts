import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "@prisma/client";
import { UUIDType } from "./uuid.js";
import { Context } from "./context.js";
import { ProfileObjectType } from "./profile.js";
import { profileResolvers } from "../resolvers/profile.js";
import { postResolvers } from "../resolvers/post.js";
import { userResolvers } from "../resolvers/user.js";
import { PostsObjectType } from "./post.js";

export const UserObjectType = new GraphQLObjectType<User, Context>({
  name: 'UserType',
  fields: () => ({
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
      type: ProfileObjectType,
      resolve: profileResolvers.profileByUserId
    },
    posts: {
      type: new GraphQLNonNull(PostsObjectType),
      resolve: postResolvers.postsByUserId,
    },
    userSubscribedTo: {
      type: new GraphQLList(UserObjectType),
      resolve: userResolvers.userSubscribedTo,
    },
    subscribedToUser: {
      type: new GraphQLList(UserObjectType),
      resolve: userResolvers.subscribedToUser,
    }
  }),
});

export const UsersObjectType = new GraphQLList(UserObjectType);
