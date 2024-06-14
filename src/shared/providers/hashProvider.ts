import { hash } from "bcryptjs";
import { IHashProvider, IHashRequestProps } from "../types/hashProvider";

export class HashProvider implements IHashProvider {
  async hash({ salt, str }: IHashRequestProps): Promise<string> {
    try {
      const result = await hash(str, salt);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
