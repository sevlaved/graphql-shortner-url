import { z } from "zod";

export const redirectClickInput = z.object({
  tracker: z.string().nonempty(),
  ua: z.string().nonempty(),
  ip: z.string().nonempty(),
  customFields: z.string().nonempty(),
});
