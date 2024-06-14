import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type User {
   _id: ID!
   email: String!
   token: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    signUp(email: String!, password: String!): Boolean
    signIn(email: String!, password: String!): User
    createCampaign(url: String!, name: String!): String
  }
`);
