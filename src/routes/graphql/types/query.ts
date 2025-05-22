import { GraphQLNonNull, GraphQLObjectType } from "graphql"
import { MembersObjectType, MemberTypeId } from "./memberType.js"
import { PostObjectType, PostsObjectType } from "./post.js"
import { UserObjectType, UsersObjectType } from "./user.js"
import { UUIDType } from "./uuid.js"
import { ProfileObjectType, ProfilesObjectType } from "./profile.js"

export const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      memberTypes: {
        type: MembersObjectType,
      },
      memberType: {
        type: MembersObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(MemberTypeId),
          },
        }
      },
      users: {
        type: UsersObjectType,
      },
      user: {
        type: UserObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          }
        }
      },
      posts: {
        type: PostsObjectType,
      },
      post: {
        type: PostObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          }
        }
      },
      profiles: {
        type: ProfilesObjectType,
      },
      profile: {
        type: ProfileObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          }
        }
      },
    }
  })