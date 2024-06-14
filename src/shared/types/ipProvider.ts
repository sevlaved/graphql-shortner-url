export type IGetIpInfoRequestProps = {
  ip: string;
};

export type IGetIpInfoResponseProps = {
  ip: string;
  city: string;
  region: string;
  country: string;
  coordinates: string[];
  postal: string;
  timezone: string;
};

export interface IIpProvider {
  getIpInfo(payload: IGetIpInfoRequestProps): Promise<IGetIpInfoResponseProps>;
}
