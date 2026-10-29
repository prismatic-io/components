import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { baseUrl, getToken } from "../client";
import { connection } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Sage Accounting",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/contacts), The base URL is already included (${baseUrl}). For example, to connect to ${baseUrl}/contacts, only /contacts is entered in this field.`,
      example: "/contacts",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const token = getToken(connection);
    try {
      const { data } = await sendRawRequest(
        baseUrl,
        {
          ...rawRequestInputs,
          debugRequest: context.debug.enabled,
        },
        {
          Authorization: `Bearer ${token}`,
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
