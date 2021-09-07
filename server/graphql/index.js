const { buildSchema } = require("graphql");
const { typeDef, resolver } = require("./hello.schema");
const {
  typeDef: typeDefAuth,
  resolver: resolverAuth
} = require("./auth.schema");

// Construct a schema, using GraphQL schema language
module.exports.schema = buildSchema(
  [typeDef, typeDefAuth].reduce((acc, s) => acc + s)
);

module.exports.resolvers = { ...resolver, ...resolverAuth };
