export type IGetUAResultRequestProps = {
  ua: string;
};
export type IGetUAResultResponseProps = {
  browser: string;
  engine: string;
  os: string;
  model: string;
  deviceType: string;
  vendor: string;
};

export interface IUserAgentProvider {
  getResult(payload: IGetUAResultRequestProps): IGetUAResultResponseProps;
}
