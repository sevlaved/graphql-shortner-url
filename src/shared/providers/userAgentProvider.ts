import { UAParser } from "ua-parser-js";
import {
  IGetUAResultRequestProps,
  IGetUAResultResponseProps,
  IUserAgentProvider,
} from "../types/userAgentProvider";

export class UserAgentProvider implements IUserAgentProvider {
  getResult({ ua }: IGetUAResultRequestProps): IGetUAResultResponseProps {
    const uaParser = new UAParser(ua);

    const result = uaParser.getResult();

    return {
      browser: result.browser.name as string,
      vendor: result.device.vendor as string,
      engine: result.engine.name as string,
      model: result.device.model as string,
      os: result.os.name as string,
      deviceType: result.device.type as string,
    };
  }
}
