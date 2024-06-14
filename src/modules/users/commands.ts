import { Db } from "mongodb";
import {
  ISIgnInUserResponseProps,
  ISignInUserRequestProps,
  ISignUpUserRequestProps,
  IUsersCommands,
} from "../../shared/types/usersCommands";

import { IUsersRepositories } from "../../shared/types/usersRepositories";
import { UsersRepositories } from "./repositories";
import { UsersModels } from "./models";
import { IHashProvider } from "../../shared/types/hashProvider";
import { HashProvider } from "../../shared/providers/hashProvider";

export class UsersCommands implements IUsersCommands {
  private usersRepositories: IUsersRepositories;

  private hashProvider: IHashProvider;

  constructor(db: Db) {
    this.usersRepositories = new UsersRepositories(db);

    this.hashProvider = new HashProvider();
  }

  async signUp({ email, password }: ISignUpUserRequestProps): Promise<void> {
    try {
      if (!email || !password) {
        throw new Error("email and password must be provided");
      }

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
  }: ISignInUserRequestProps): Promise<ISIgnInUserResponseProps> {
    try {
      if (!email || !password) {
        throw new Error("email and password must be provided");
      }

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
