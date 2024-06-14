import { UsersCommands } from "../../modules/users/commands";
import { Mongodb } from "../../shared/infra/database/mongoDb";
import { ISignUpUserRequestProps } from "../../shared/types/usersCommands";

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
};
