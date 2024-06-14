import { Db, ObjectId } from "mongodb";
import { ICampaignsRepositories } from "../../shared/types/campaignsRepositories";
import { IClicksCommands } from "../../shared/types/clicksCommands";
import { IClicksRepositories } from "../../shared/types/clicksRepositories";
import { CampaignsRepositories } from "../campaigns/repositories";
import { ClicksRepositories } from "./repositories";
import { z } from "zod";
import { redirectClickInput } from "./utils";
import { IUserAgentProvider } from "../../shared/types/userAgentProvider";
import { IpProvider } from "../../shared/providers/ipProvider";
import { IIpProvider } from "../../shared/types/ipProvider";
import { UserAgentProvider } from "../../shared/providers/userAgentProvider";
import { ClicksModels } from "./models";

export class ClicksCommands implements IClicksCommands {
  clicksRepositories: IClicksRepositories;

  campaignsRepositories: ICampaignsRepositories;

  userAgentProvider: IUserAgentProvider;

  IpProvider: IIpProvider;

  constructor(db: Db) {
    this.clicksRepositories = new ClicksRepositories(db);
    this.campaignsRepositories = new CampaignsRepositories(db);
    this.userAgentProvider = new UserAgentProvider();
    this.IpProvider = new IpProvider();
  }

  async redirect({
    tracker,
    ua,
    ip,
  }: z.infer<typeof redirectClickInput>): Promise<string> {
    const getPayloadClick = async () => {
      try {
        const payloadUa = this.userAgentProvider.getResult({ ua });
        const payloadIp = await this.IpProvider.getIpInfo({ ip });

        return { ...payloadIp, ...payloadUa };
      } catch (error) {
        throw error;
      }
    };

    try {
      redirectClickInput.parse({ tracker, ip, ua });

      const campaign = await this.campaignsRepositories.findByTracker({
        tracker,
        projection: {
          url: 1,
          _id: 1,
        },
      });

      console.log({ campaign, tracker });

      if (!campaign) {
        throw new Error("campaign not found");
      }

      getPayloadClick()
        .then((result) => {
          const click = new ClicksModels({
            ...result,
            campaignId: campaign._id,
          });

          console.log("created sem erro");

          this.clicksRepositories.create(click);
        })
        .catch(() => {
          const click = new ClicksModels({
            browser: "",
            campaignId: campaign._id,
            city: "",
            coordinates: [],
            country: "",
            deviceType: "",
            engine: "",
            ip: "",
            model: "",
            os: "",
            postal: "",
            region: "",
            timezone: "",
            vendor: "",
          });

          console.log("created com erro");

          this.clicksRepositories.create(click);
        });

      console.log("redirect");
      return campaign.url;
    } catch (error) {
      console.warn(error);
      //fallback
      return "https://google.com";
    }
  }
}
