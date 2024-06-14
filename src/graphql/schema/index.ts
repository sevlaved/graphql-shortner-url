import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    hello: String
  }

  type Mutation {
    signUp(email: String!, password: String!): Boolean
  }
`);
