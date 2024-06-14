export type IHashRequestProps = {
  str: string;
  salt: number;
};

export interface IHashProvider {
  hash(payload: IHashRequestProps): Promise<string>;
}
