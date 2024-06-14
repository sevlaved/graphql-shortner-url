import { CampaignsModels } from "../../modules/campaigns/models";
import { ProjectionType } from "./global";

export type IFIndOneByTracker = {
  tracker: string;
  projection: ProjectionType<CampaignsModels>;
};

export interface ICampaignsRepositories {
  create(payload: CampaignsModels): Promise<void>;
  findByTracker(payload: IFIndOneByTracker): Promise<CampaignsModels | null>;
}
