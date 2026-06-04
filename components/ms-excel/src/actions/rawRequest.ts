import { action } from "@prismatic-io/spectral";
import { connection } from "../inputs/general";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;
import { getBaseUrl } from "../helpers";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Excel API.",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const token = connection?.token?.access_token;
    const url = getBaseUrl(false);
    const { data } = await sendRawRequest(
      url,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/me/drive), The base URL is already included (https://graph.microsoft.com/v1.0). For example, to connect to https://graph.microsoft.com/v1.0/me/drive, only /me/drive is entered in this field.",
      example: "/me/drive",
    },
  },
});
