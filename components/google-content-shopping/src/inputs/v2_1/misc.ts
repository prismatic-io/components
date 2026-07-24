import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, version } from "./common";
const { debugRequest: _, ...rawHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  version,
  ...rawHttpInputs,
  url: {
    ...rawHttpInputs.url,
    comments:
      "Input the path only (/{merchantId}/accounts), The base URL is already included (https://shoppingcontent.googleapis.com/content/{version}). For example, to connect to https://shoppingcontent.googleapis.com/content/v2.1/{merchantId}/accounts, only /{merchantId}/accounts is entered in this field.",
    example: "/{merchantId}/accounts",
  },
};
