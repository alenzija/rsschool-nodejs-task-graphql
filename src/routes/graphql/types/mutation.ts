import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserObjectType } from "./user.js";
import { CreateUserInput } from "./createUserInput.js";
import { userResolvers } from "../resolvers/user.js";
import { ProfileObjectType } from "./profile.js";
import { CreateProfileInput } from "./createProfileInput.js";
import { profileResolvers } from "../resolvers/profile.js";
import { PostObjectType } from "./post.js";
import { CreatePostInput } from "./createPostInput.js";
import { postResolvers } from "../resolvers/post.js";
import { UUIDType } from "./uuid.js";
import { ChangePostInput } from "./changePostInput.js";
import { ChangeUserInput } from "./changeUserInput.js";
import { ChangeProfileInput } from "./changeProfileInput.js";

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(UserObjectType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInput),
        }
      },
      resolve: userResolvers.createUser
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileObjectType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInput),
        }
      },
      resolve: profileResolvers.createProfile,
    },
    createPost: {
      type: new GraphQLNonNull(PostObjectType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInput),
        }
      },
      resolve: postResolvers.createPost,
    },
    changePost: {
      type: new GraphQLNonNull(PostObjectType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
        dto: {
          type: new GraphQLNonNull(ChangePostInput),
        }
      },
      resolve: postResolvers.changePost,
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileObjectType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInput),
        }
      },
      resolve: profileResolvers.changeProfile,
    },
    changeUser: {
      type: new GraphQLNonNull(UserObjectType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
        dto: {
          type: new GraphQLNonNull(ChangeUserInput),
        }
      },
      resolve: userResolvers.changeUser,
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: userResolvers.deleteUser,
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: postResolvers.deletePost,
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: profileResolvers.deleteProfile,
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType)
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: userResolvers.subscribeTo,
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType)
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: userResolvers.unsubscribeFrom,
    },
  }

});