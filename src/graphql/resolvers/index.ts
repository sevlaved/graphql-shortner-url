import { UsersCommands } from "../../modules/users/commands";
import { Mongodb } from "../../shared/infra/database/mongoDb";
import {
  ISignInUserRequestProps,
  ISignUpUserRequestProps,
} from "../../shared/types/usersCommands";

export const resolvers = {
  hello: () => {
    return "Hello, world!";
  },
  signUp: async (payload: ISignUpUserRequestProps) => {
    try {
      const db = await Mongodb.getDb();
      const command = new UsersCommands(db);
      await command.signUp(payload);
      return true;
    } catch (error) {
      throw error;
    }
  },
  signIn: async (payload: ISignInUserRequestProps) => {
    try {
      const db = await Mongodb.getDb();
      const command = new UsersCommands(db);
      const result = await command.signIn(payload);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
