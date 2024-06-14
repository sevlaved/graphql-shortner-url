import express, { Application } from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { Mongodb } from "./shared/infra/database/mongoDb";

dotenv.config();

export class App {
  app: Application;

  constructor() {
    this.app = express();
  }

  middlewares(): void {
    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
      })
    );
  }

  async setupApp(): Promise<Application> {
    await Mongodb.getDb();
    this.middlewares();
    return this.app;
  }
}
