import { Collection, Db } from "mongodb";
import {
  ICampaignsRepositories,
  IFIndOneByTracker,
} from "../../shared/types/campaignsRepositories";
import { collections } from "../../shared/commons/constants";
import { CampaignsModels } from "./models";

export class CampaignsRepositories implements ICampaignsRepositories {
  campaignsDb: Collection;

  constructor(db: Db) {
    this.campaignsDb = db.collection(collections.campaigns);
  }

  async create(payload: CampaignsModels): Promise<void> {
    try {
      await this.campaignsDb.insertOne(payload);
    } catch (error) {
      throw error;
    }
  }

  async findByTracker({
    projection,
    tracker,
  }: IFIndOneByTracker): Promise<CampaignsModels | null> {
    try {
      const query = {
        tracker,
      };

      const campaign = await this.campaignsDb.findOne<CampaignsModels | null>(
        { ...query },
        { projection }
      );

      return campaign;
    } catch (error) {
      throw error;
    }
  }
}
