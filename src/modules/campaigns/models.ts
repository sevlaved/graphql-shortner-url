import { ObjectId } from "mongodb";
import { BaseModels } from "../../shared/commons/BaseModels";

export class CampaignsModels extends BaseModels {
  url: string;

  name: string;

  userId: ObjectId;

  tracker: string;

  constructor({
    url,
    name,
    userId,
    tracker,
  }: Omit<CampaignsModels, "_id" | "createdAt" | "updatedAt">) {
    super();

    this.url = url;
    this.name = name;
    this.userId = userId;
    this.tracker = tracker;
  }
}
