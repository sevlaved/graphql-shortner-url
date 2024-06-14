import axios from "axios";
import {
  IGetIpInfoRequestProps,
  IGetIpInfoResponseProps,
  IIpProvider,
} from "../types/ipProvider";

const BASE_URL = "https://ipinfo.io";

export class IpProvider implements IIpProvider {
  async getIpInfo({
    ip,
  }: IGetIpInfoRequestProps): Promise<IGetIpInfoResponseProps> {
    try {
      let parsedIp = ip;

      if (parsedIp.includes("::ffff:")) {
        parsedIp = parsedIp.split("::ffff:")[1];
      }

      // Força o uso de IPv4
      if (parsedIp.includes(":")) {
        parsedIp = parsedIp.split(":").reverse()[0];
      }

      const response = await axios.get(
        `${BASE_URL}/${parsedIp}?token=${process.env.IPINFO_TOKEN as string}`
      );

      return {
        ip: response.data.ip,
        city: response.data.city,
        region: response.data.region,
        country: response.data.country,
        coordinates: response.data.loc ? response.data.loc.split(",") : "",
        postal: response.data.postal,
        timezone: response.data.timezone,
      };
    } catch (error) {
      return {
        ip,
        city: "",
        region: "",
        country: "",
        coordinates: [],
        postal: "",
        timezone: "",
      };
    }
  }
}
