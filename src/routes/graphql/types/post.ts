import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Post } from "@prisma/client";
import { Context } from "./context.js";
import { UUIDType } from "./uuid.js";

export const PostObjectType = new GraphQLObjectType<Post, Context>({
  name: 'PostType',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType)
    },
    title:{
      type: new GraphQLNonNull(GraphQLString)
    },
    content:{
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export const PostsObjectType = new GraphQLList(PostObjectType);
