const Koa = require("koa");
const cors = require("@koa/cors");
const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const { schema, resolvers } = require("./graphql");

const app = new Koa();
const health = new Koa();

app.use(cors());

health.use(async function (ctx, next) {
  await next();
  ctx.body = "Ok";
});

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers,
      graphiql: true
    })
  )
);

app.use(mount("/", health));

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
