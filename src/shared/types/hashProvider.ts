export type IHashRequestProps = {
  str: string;
  salt: number;
};

export type ICompareHashRequestProps = {
  str: string;
  compare: string;
};

export type IJwtRequestProps = {
  _id: string;
};

export type IDecodeRequestProps = {
  jwt: string;
};

export type IDecodedJwtProps = {
  _id: string;
};
export interface IHashProvider {
  hash(payload: IHashRequestProps): Promise<string>;
  compare(payload: ICompareHashRequestProps): Promise<boolean>;
  jwt(payload: IJwtRequestProps): string;
  decode(payload: IDecodeRequestProps): string;
}
