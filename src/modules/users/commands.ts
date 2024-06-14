import { Db } from "mongodb";
import {
  ISIgnInUserResponseProps,
  IUsersCommands,
} from "../../shared/types/usersCommands";

import { IUsersRepositories } from "../../shared/types/usersRepositories";
import { UsersRepositories } from "./repositories";
import { UsersModels } from "./models";
import { IHashProvider } from "../../shared/types/hashProvider";
import { HashProvider } from "../../shared/providers/hashProvider";
import { z } from "zod";
import { signInInput, signUpInput } from "./utils";

export class UsersCommands implements IUsersCommands {
  private usersRepositories: IUsersRepositories;

  private hashProvider: IHashProvider;

  constructor(db: Db) {
    this.usersRepositories = new UsersRepositories(db);

    this.hashProvider = new HashProvider();
  }

  async signUp({
    email,
    password,
  }: z.infer<typeof signUpInput>): Promise<void> {
    try {
      signUpInput.parse({ email, password });

      const checkIfUserAlreadyRegistered =
        await this.usersRepositories.findUserByEmail({
          email,
          projection: {
            _id: 1,
          },
        });

      if (checkIfUserAlreadyRegistered) {
        throw new Error("user already registered");
      }

      const hashedPassword = await this.hashProvider.hash({
        str: password,
        salt: 8,
      });

      const user = new UsersModels({ email, password: hashedPassword });

      await this.usersRepositories.create(user);
    } catch (error) {
      throw error;
    }
  }

  async signIn({
    email,
    password,
  }: z.infer<typeof signInInput>): Promise<ISIgnInUserResponseProps> {
    try {
      signInInput.parse({ email, password });

      const getUser = await this.usersRepositories.findUserByEmail({
        email,
        projection: {
          _id: 1,
          isActive: 1,
          email: 1,
          password: 1,
        },
      });

      if (!getUser) {
        throw new Error("email/password is invalid");
      }

      const compare = await this.hashProvider.compare({
        compare: getUser.password,
        str: password,
      });

      if (!compare) {
        throw new Error("email/password is invalid");
      }

      const token = this.hashProvider.jwt({ _id: String(getUser._id) });

      return {
        email: getUser.email,
        _id: String(getUser._id),
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
