import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
  hello: () => {
    return "Hello World";
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`🚀 Express/GraphQL listening on port ${PORT}`)
);
