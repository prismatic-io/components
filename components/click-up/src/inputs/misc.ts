import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const { debugRequest: _debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputsWithoutDebug,
  url: {
    ...httpClientInputs.url,
    comments:
      "The path-only URL to call (e.g. /space/${spaceId}/tag). The base URL https://api.clickup.com/api/v2 is added automatically.",
    example: "/space/${spaceId}/tag",
  },
};
