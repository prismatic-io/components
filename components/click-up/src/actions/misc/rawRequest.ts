import { action } from "@prismatic-io/spectral";
import { inputs as httpClientInputs, sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

const { debugRequest: _debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to the ClickUp API.",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    connection: connectionInput,
    ...httpInputsWithoutDebug,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/space/${spaceId}/tag), The base URL is already included (https://api.clickup.com/api/v2). For example, to connect to https://api.clickup.com/api/v2/space/${spaceId}/tag, only /space/${spaceId}/tag is entered in this field.",
      example: "/space/${spaceId}/tag",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { data } = await sendRawRequest(
      "https://api.clickup.com/api/v2",
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${connection?.token?.access_token}`,
      }
    );
    return { data };
  },
});
