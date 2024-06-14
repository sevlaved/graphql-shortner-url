import { ObjectId } from "mongodb";
import { DateProvider } from "../providers/dateProvider";

export class BaseModels {
  createdAt: number;

  updatedAt: number;

  _id: ObjectId;

  constructor() {
    this.createdAt = new DateProvider().now();
    this.updatedAt = new DateProvider().now();
    this._id = new ObjectId();
  }
}
