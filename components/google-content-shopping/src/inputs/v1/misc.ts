import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";
const { debugRequest: _, ...rawHttpInputs } = httpClientInputs;
export const rawRequestMerchantInputs = {
  connection: connectionInput,
  ...rawHttpInputs,
  url: {
    ...rawHttpInputs.url,
    comments:
      "Input the path only, including the sub-API and version segment. The base URL (https://merchantapi.googleapis.com) is already included. For example, to call https://merchantapi.googleapis.com/accounts/v1/accounts/123456789, enter /accounts/v1/accounts/123456789.",
    example: "/accounts/v1/accounts/123456789",
  },
};
