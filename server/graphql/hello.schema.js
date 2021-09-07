module.exports.typeDef = `
type Query {
  hello: String
}
`;

module.exports.resolver = {
  hello: () => "Hello world!"
};
