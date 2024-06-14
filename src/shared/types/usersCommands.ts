export type ISignUpUserRequestProps = {
  email: string;
  password: string;
};

export type ISignInUserRequestProps = {
  email: string;
  password: string;
};

export type ISIgnInUserResponseProps = {
  email: string;
  _id: string;
  token: string;
};
export interface IUsersCommands {
  signUp(payload: ISignUpUserRequestProps): Promise<void>;
  signIn(payload: ISignInUserRequestProps): Promise<ISIgnInUserResponseProps>;
}
