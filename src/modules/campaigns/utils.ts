import { z } from "zod";

export const createCampaignInput = z.object({
  name: z.string().nonempty().max(80),
  url: z.string().url().nonempty(),
  token: z.string().nonempty(),
});
