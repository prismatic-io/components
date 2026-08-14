export const API_URL = "https://app.pdq.com";
export const API_VERSION = "v1";
export const INVALID_CONNECTION = "Invalid connection provided for PDQ.";
export const SUCCESS_EMPTY_PAYLOAD = "CREATED SUCCESSFULLY";
export const DEFAULT_PAGE_SIZE = 100;
export const DEVICES_ENDPOINT = "/devices";
export const GROUPS_ENDPOINT = "/groups";
export const PACKAGES_ENDPOINT = "/packages";
export const POLL_RESOURCES = {
  Devices: { endpoint: DEVICES_ENDPOINT },
  Groups: { endpoint: GROUPS_ENDPOINT },
} as const;
export type PollResourceType = keyof typeof POLL_RESOURCES;
export const POLL_RESOURCE_CONFIG: {
  readonly [K in PollResourceType]: {
    readonly endpoint: string;
  };
} & {
  readonly [resource: string]:
    | {
        readonly endpoint: string;
      }
    | undefined;
} = POLL_RESOURCES;
