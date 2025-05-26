import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import { query } from './types/query.js';
import { mutation } from './types/mutation.js';
import depthLimit from 'graphql-depth-limit';
import { memberTypeDataLoader } from './loaders/memberType.js';
import { profileDataLoader } from './loaders/profile.js';
import { postsDataLoader } from './loaders/post.js';
import { userDataLoaders } from './loaders/user.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const errors = validate(schema, parse(req.body.query), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      }
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
          prisma,
          loaders: {
            memberTypeLoader: memberTypeDataLoader(prisma),
            profileLoader: profileDataLoader(prisma),
            postsLoader: postsDataLoader(prisma),
            userLoaders: userDataLoaders(prisma),
          }
        },
      });
    },
  });
};

const schema = new GraphQLSchema({
  query: query,
  mutation: mutation,
})

export default plugin;
