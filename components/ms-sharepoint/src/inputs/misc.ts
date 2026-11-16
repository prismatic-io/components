import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";
import { connection } from "./common";

const { debugRequest, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "Input the path only (/me/followedSites), The base URL is already included (https://graph.microsoft.com/v1.0). For example, to connect to https://graph.microsoft.com/v1.0/me/followedSites, only /me/followedSites is entered in this field.",
    example: "/me/followedSites",
  },
};
