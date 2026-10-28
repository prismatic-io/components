import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, timeout } from "./common";
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;
export const rawRequestInputSet = {
  connection: connectionInput,
  ...rawRequestInputs,
  url: {
    ...rawRequestInputs.url,
    comments:
      "Input the path only (/crm/objects/2026-09/deals). The base URL is already included (`https://api.hubapi.com`). For example, to connect to `https://api.hubapi.com/crm/objects/2026-09/deals`, only `/crm/objects/2026-09/deals` is entered in this field.",
    example: "/crm/objects/2026-09/deals",
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
