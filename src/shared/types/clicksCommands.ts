import { z } from "zod";
import { redirectClickInput } from "../../modules/clicks/utils";

export interface IClicksCommands {
  redirect(payload: z.infer<typeof redirectClickInput>): Promise<string>;
}
