import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { baseUrl } from "../../client";
import { connectionInput } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to HubSpot",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/crm/v3/objects/deals). The base URL is already included (`https://api.hubapi.com`). For example, to connect to `https://api.hubapi.com/crm/v3/objects/deals`, only `/crm/v3/objects/deals` is entered in this field.",
      example: "/crm/v3/objects/deals",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${connection.token?.access_token || connection.fields.accessToken}`,
      },
    );
    return { data };
  },
});
