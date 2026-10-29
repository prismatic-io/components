import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, region } from "./common";

export const rawRequestInputs = {
  connection: connectionInput,
  region,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "The path to append to the base URL. Enter the path only (for example, /v1/accounts/region); the base URL (https://track.customer.io/api) is already included.",
    example: "/v1/accounts/region",
  },
};
