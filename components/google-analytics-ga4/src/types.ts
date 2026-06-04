import type { Connection } from "@prismatic-io/spectral";
import type { ANALYTICS_ENDPOINTS, POLL_RESOURCE_CONFIG, POLL_RESOURCE_KEYS } from "./constants";

export type Account = {
  name: string;
  createTime: string;
  updateTime: string;
  displayName: string;
  regionCode: string;
};

export type Property = {
  name: string;
  parent: string;
  createTime: string;
  updateTime: string;
  displayName: string;
  industryCategory: string;
  timeZone: string;
  currencyCode: string;
  serviceLevel: string;
  account: string;
  propertyType: string;
};

export interface CreateAnalyticsClientProps {
  connection: Connection;
  endpointType: keyof typeof ANALYTICS_ENDPOINTS;
  debug?: boolean;
}

export type PaginatedFunction<T, K extends string = string> = {
  [P in K]: T[];
} & {
  nextPageToken?: string;
};

export type PollingState = {
  lastPolledAt: string;
};

export type GA4Record = Account | Property;

export type GA4PollableResource = (typeof POLL_RESOURCE_KEYS)[keyof typeof POLL_RESOURCE_KEYS];

export type PollResourceKey = keyof typeof POLL_RESOURCE_CONFIG;
