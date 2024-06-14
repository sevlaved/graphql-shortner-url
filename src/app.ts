import express, { Application } from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { Mongodb } from "./shared/infra/database/mongoDb";
import { ensureRedirect } from "./shared/infra/http/middlewares/ensureRedirect";

dotenv.config();

export class App {
  app: Application;

  constructor() {
    this.app = express();
  }

  middlewares(): void {
    this.app.set("trust proxy", 1);

    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
      })
    );

    this.app.use("/:tracker", ensureRedirect);
  }

  async setupApp(): Promise<Application> {
    await Mongodb.getDb();
    this.middlewares();
    return this.app;
  }
}
