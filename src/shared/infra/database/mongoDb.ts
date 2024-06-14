import { MongoClient, Db } from "mongodb";

let instanceDb: Db;

export class Mongodb {
  static async getDb(): Promise<Db> {
    try {
      if (instanceDb) {
        return instanceDb;
      }

      const client = new MongoClient(process.env.MONGODB_URL as string);

      console.log(process.env.MONGODB_DATABASE);

      instanceDb = client.db(process.env.MONGODB_DATABASE);

      return instanceDb;
    } catch (error) {
      console.warn(error);
      process.exit(0);
    }
  }
}
