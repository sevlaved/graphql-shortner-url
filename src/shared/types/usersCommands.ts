import { z } from "zod";
import { signInInput, signUpInput } from "../../modules/users/utils";

export type ISIgnInUserResponseProps = {
  email: string;
  _id: string;
  token: string;
};
export interface IUsersCommands {
  signUp(payload: z.infer<typeof signUpInput>): Promise<void>;
  signIn(
    payload: z.infer<typeof signInInput>
  ): Promise<ISIgnInUserResponseProps>;
}
