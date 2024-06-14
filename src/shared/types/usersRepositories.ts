import { UsersModels } from "../../modules/users/models";
import { ProjectionType } from "./global";

export type IFindUserByEmail = {
  email: string;
  projection: ProjectionType<UsersModels>;
};

export interface IUsersRepositories {
  create(payload: UsersModels): Promise<void>;
  findUserByEmail(payload: IFindUserByEmail): Promise<UsersModels | null>;
}
