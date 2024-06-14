import { ObjectId } from "mongodb";
import { BaseModels } from "../../shared/commons/BaseModels";

export class ClicksModels extends BaseModels {
  campaignId: ObjectId;

  ip: string;

  city: string;

  region: string;

  country: string;

  coordinates: string[];

  postal: string;

  timezone: string;

  browser: string;

  engine: string;

  os: string;

  model: string;

  deviceType: string;

  vendor: string;

  customFields: string;

  constructor({
    browser,
    campaignId,
    city,
    coordinates,
    country,
    deviceType,
    engine,
    ip,
    model,
    os,
    postal,
    region,
    timezone,
    vendor,
    customFields,
  }: Omit<ClicksModels, "_id" | "createdAt" | "updatedAt">) {
    super();

    this.browser = browser;
    this.campaignId = campaignId;
    this.city = city;
    this.coordinates = coordinates;
    this.country = country;
    this.deviceType = deviceType;
    this.engine = engine;
    this.ip = ip;
    this.model = model;
    this.os = os;
    this.postal = postal;
    this.region = region;
    this.timezone = timezone;
    this.vendor = vendor;
    this.customFields = customFields;
  }
}
