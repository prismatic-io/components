import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";
const { debugRequest: _debugRequest, ...httpInputsWithoutDebug } =
  httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputsWithoutDebug,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/space/${spaceId}/tag), The base URL is already included (https://api.clickup.com/api/v2). For example, to connect to https://api.clickup.com/api/v2/space/${spaceId}/tag, only /space/${spaceId}/tag is entered in this field.",
    example: "/space/${spaceId}/tag",
  },
};
