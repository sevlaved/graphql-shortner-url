import { Collection, Db } from "mongodb";
import {
  IFindUserByEmail,
  IUsersRepositories,
} from "../../shared/types/usersRepositories";
import { collections } from "../../shared/commons/constants";
import { UsersModels } from "./models";

export class UsersRepositories implements IUsersRepositories {
  private usersDb: Collection;

  constructor(db: Db) {
    this.usersDb = db.collection(collections.users);
  }

  async create(payload: UsersModels): Promise<void> {
    try {
      await this.usersDb.insertOne(payload);
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail({
    email,
    projection,
  }: IFindUserByEmail): Promise<UsersModels | null> {
    try {
      const regex = new RegExp(email, "i");

      const query = {
        email: regex,
      };

      const result = await this.usersDb.findOne<UsersModels | null>(
        { ...query },
        { projection }
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}
