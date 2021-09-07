module.exports.typeDef = `
extend type Query {
  auth: String
}
`;

module.exports.resolver = {
  auth: () => {
    const userCan = true;
    return userCan;
  }
};
