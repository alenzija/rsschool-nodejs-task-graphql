import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import { query } from './types/query.js';
import { mutation } from './types/mutation.js';
import depthLimit from 'graphql-depth-limit';

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
          prisma
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
