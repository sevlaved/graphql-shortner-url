import { Collection, Db } from "mongodb";
import { IClicksRepositories } from "../../shared/types/clicksRepositories";
import { collections } from "../../shared/commons/constants";
import { ClicksModels } from "./models";

export class ClicksRepositories implements IClicksRepositories {
  clicksDb: Collection;

  constructor(db: Db) {
    this.clicksDb = db.collection(collections.clicks);
  }

  async create(payload: ClicksModels): Promise<void> {
    try {
      await this.clicksDb.insertOne(payload);
    } catch (error) {}
  }
}
