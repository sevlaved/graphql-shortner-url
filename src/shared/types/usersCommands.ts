export type ISignUpUserRequestProps = {
  email: string;
  password: string;
};

export interface IUsersCommands {
  signUp(payload: ISignUpUserRequestProps): Promise<void>;
}
