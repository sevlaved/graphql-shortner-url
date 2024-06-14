import { IDateProvider } from "../types/dateProvider";

export class DateProvider implements IDateProvider {
  now(): number {
    return new Date().getTime();
  }
}
