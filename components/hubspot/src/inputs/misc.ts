import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, timeout } from "./common";
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;
export const rawRequestInputSet = {
  connection: connectionInput,
  ...rawRequestInputs,
  url: {
    ...rawRequestInputs.url,
    comments:
      "Input the path only (/crm/v3/objects/deals). The base URL is already included (`https://api.hubapi.com`). For example, to connect to `https://api.hubapi.com/crm/v3/objects/deals`, only `/crm/v3/objects/deals` is entered in this field.",
    example: "/crm/v3/objects/deals",
  },
};
export const getCurrentUserInputs = {
  timeout,
  hubspotConnection: connectionInput,
};
export const validateConnectionInputs = {
  timeout,
  hubspotConnection: connectionInput,
};
