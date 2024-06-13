import express, { Application } from "express";
import { Db } from "mongodb";
import dotenv from "dotenv";
import { Mongodb } from "./shared/infra/database/mongoDb";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

dotenv.config();

export class App {
  app: Application;

  constructor() {
    this.app = express();
  }

  async database(): Promise<Db> {
    const db = await Mongodb.getDb();
    return db;
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
    await this.database();
    this.middlewares();
    return this.app;
  }
}
