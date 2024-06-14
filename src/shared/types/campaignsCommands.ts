import { z } from "zod";
import { createCampaignInput } from "../../modules/campaigns/utils";

export interface ICampaignsCommands {
  create(payload: z.infer<typeof createCampaignInput>): Promise<string>;
}
