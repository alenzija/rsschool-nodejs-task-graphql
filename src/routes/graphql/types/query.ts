import { GraphQLNonNull, GraphQLObjectType } from "graphql"
import { MemberObjectType, MembersObjectType, MemberTypeId } from "./memberType.js"
import { PostObjectType, PostsObjectType } from "./post.js"
import { UserObjectType, UsersObjectType } from "./user.js"
import { UUIDType } from "./uuid.js"
import { ProfileObjectType, ProfilesObjectType } from "./profile.js"
import { memberTypeResolvers } from "../resolvers/memberType.js"
import { postResolvers } from "../resolvers/post.js"
import { profileResolvers } from "../resolvers/profile.js"
import { userResolvers } from "../resolvers/user.js"

export const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      memberTypes: {
        type: new GraphQLNonNull(MembersObjectType),
        resolve: memberTypeResolvers.memberTypes
      },
      memberType: {
        type: MemberObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(MemberTypeId),
          },
        },
        resolve: memberTypeResolvers.memberTypeById,
      },
      users: {
        type: new GraphQLNonNull(UsersObjectType),
        resolve: userResolvers.users,
      },
      user: {
        type: UserObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          }
        },
        resolve: userResolvers.userById,
      },
      posts: {
        type: new GraphQLNonNull(PostsObjectType),
        resolve: postResolvers.posts,
      },
      post: {
        type: PostObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          }
        },
        resolve: postResolvers.postById,
      },
      profiles: {
        type: new GraphQLNonNull(ProfilesObjectType),
        resolve: profileResolvers.profiles
      },
      profile: {
        type: ProfileObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          }
        },
        resolve: profileResolvers.profileById,
      },
    }
  })