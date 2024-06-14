import { z } from "zod";
import { UsersCommands } from "../../modules/users/commands";
import { Mongodb } from "../../shared/infra/database/mongoDb";
import { signInInput, signUpInput } from "../../modules/users/utils";
import { createCampaignInput } from "../../modules/campaigns/utils";
import { CampaignsCommands } from "../../modules/campaigns/commands";
import { Request } from "express";

export const resolvers = {
  hello: () => {
    return "Hello, world!";
  },
  signUp: async (payload: z.infer<typeof signUpInput>) => {
    try {
      const db = await Mongodb.getDb();
      const command = new UsersCommands(db);
      await command.signUp(payload);
      return true;
    } catch (error) {
      throw error;
    }
  },
  signIn: async (payload: z.infer<typeof signInInput>) => {
    try {
      const db = await Mongodb.getDb();
      const command = new UsersCommands(db);
      const result = await command.signIn(payload);
      return result;
    } catch (error) {
      throw error;
    }
  },
  createCampaign: async (
    payload: z.infer<typeof createCampaignInput>,
    req: Request
  ) => {
    try {
      const db = await Mongodb.getDb();
      const command = new CampaignsCommands(db);
      const result = await command.create({
        ...payload,
        token: req.headers.authorization as string,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
