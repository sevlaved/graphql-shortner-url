import { compare as bcryptCompare, hash } from "bcryptjs";
import {
  ICompareHashRequestProps,
  IHashProvider,
  IHashRequestProps,
  IJwtRequestProps,
} from "../types/hashProvider";
import { sign } from "jsonwebtoken";

export class HashProvider implements IHashProvider {
  async hash({ salt, str }: IHashRequestProps): Promise<string> {
    try {
      const result = await hash(str, salt);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async compare({ compare, str }: ICompareHashRequestProps): Promise<boolean> {
    try {
      const result = await bcryptCompare(str, compare);
      return result;
    } catch (error) {
      throw error;
    }
  }

  jwt({ _id }: IJwtRequestProps): string {
    const token = sign(
      {
        _id,
      },
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}
