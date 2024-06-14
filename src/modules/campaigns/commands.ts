import { Db, ObjectId } from "mongodb";
import { ICampaignsCommands } from "../../shared/types/campaignsCommands";
import { ICampaignsRepositories } from "../../shared/types/campaignsRepositories";
import { CampaignsRepositories } from "./repositories";
import { z } from "zod";
import { createCampaignInput } from "./utils";
import { generate } from "randomstring";
import { HashProvider } from "../../shared/providers/hashProvider";
import { CampaignsModels } from "./models";

export class CampaignsCommands implements ICampaignsCommands {
  campaignsRepositories: ICampaignsRepositories;

  hashProvider: HashProvider;

  constructor(db: Db) {
    this.campaignsRepositories = new CampaignsRepositories(db);

    this.hashProvider = new HashProvider();
  }

  async create({
    token,
    name,
    url,
  }: z.infer<typeof createCampaignInput>): Promise<string> {
    try {
      const userId = this.hashProvider.decode({
        jwt: token,
      });

      let tracker = "";

      if (!tracker) {
        const random = generate(6);
        const campaign = await this.campaignsRepositories.findByTracker({
          tracker: random,
          projection: {
            _id: 1,
          },
        });

        if (!campaign) {
          tracker = random;
        }
      }

      const campaign = new CampaignsModels({
        userId: new ObjectId(userId),
        name,
        url,
        tracker,
      });

      await this.campaignsRepositories.create(campaign);

      return `https://google.com/${tracker}`;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
}
