import { action, util } from "@prismatic-io/spectral";
import { connection } from "../../inputs";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Zoom",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const baseUrl = `https://api.zoom.us/v2`;
    const token = connection?.token?.access_token;

    try {
      const { data, headers } = await sendRawRequest(
        baseUrl,
        {
          ...rawRequestInputs,
          debugRequest: context.debug.enabled,
        },
        {
          Authorization: `Bearer ${token}`,
        },
      );

      return {
        data: { data, headers },
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/workspaces), The base URL is already included (https://api.zoom.us/v2). For example, to connect to https://api.zoom.us/v2/workspaces, only /workspaces is entered in this field.",
      example: "/workspaces",
    },
  },
});
