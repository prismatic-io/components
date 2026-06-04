import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

import { connectionInput } from "../inputs";
import { API_VERSION, BASE_URL } from "../constants";
import { validateConnection } from "../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to SendGrid",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/templates), The base URL is already included (${BASE_URL}/${API_VERSION}). For example, to connect to ${BASE_URL}/${API_VERSION}/templates, only /templates is entered in this field.`,
      example: "/templates",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const apiKey = util.types.toString(connection.fields.apiKey);
    try {
      const { data } = await sendRawRequest(
        `${BASE_URL}/${API_VERSION}`,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${apiKey}`,
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
