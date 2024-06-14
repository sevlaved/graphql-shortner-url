import { ClicksModels } from "../../modules/clicks/models";

export interface IClicksRepositories {
  create(payload: ClicksModels): Promise<void>;
}
