import { action } from "@prismatic-io/spectral";
import { oneDriveConnection } from "../inputs";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, validateConnection } from "../util";
import { BASE_URL } from "../constants";
import { rawRequestExamplePayload } from "../examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Onedrive",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const headers = getAuthHeaders(connection);
    const { data } = await sendRawRequest(
      BASE_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      headers,
    );
    return { data };
  },
  inputs: {
    connection: oneDriveConnection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/me/drive), The base URL is already included (https://graph.microsoft.com/v1.0). For example, to connect to https://graph.microsoft.com/v1.0/me/drive, only /me/drive is entered in this field.",
      example: "/me/drive",
    },
  },
  examplePayload: rawRequestExamplePayload,
});
