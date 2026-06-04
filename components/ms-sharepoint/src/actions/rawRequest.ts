import { action } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAccessToken } from "../utils";
import { rawRequestExamplePayload } from "../examplePayloads/actions";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Sharepoint",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, ...httpClientInputs }) => {
    const baseUrl = "https://graph.microsoft.com/v1.0";
    const token = await getAccessToken(connection);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...httpClientInputs,
        debugRequest: debug,
      },
      headers,
    );
    return { data };
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/me/followedSites), The base URL is already included (https://graph.microsoft.com/v1.0). For example, to connect to https://graph.microsoft.com/v1.0/me/followedSites, only /me/followedSites is entered in this field.",
      example: "/me/followedSites",
    },
  },
  examplePayload: rawRequestExamplePayload,
});
