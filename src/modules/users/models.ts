import { BaseModels } from "../../shared/commons/BaseModels";

export class UsersModels extends BaseModels {
  email: string;

  password: string;

  isActive?: boolean;

  constructor({
    email,
    password,
    isActive = true,
  }: Omit<UsersModels, "_id" | "createdAt" | "updatedAt">) {
    super();

    this.email = email;
    this.password = password;
    this.isActive = isActive;
  }
}
