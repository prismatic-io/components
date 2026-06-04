import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../client";
import { API_BASE_URL } from "../constants";
import { rawRequestExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import { connection } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Adobe I/O Events",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/{consumer_org_id}/providers), The base URL is already included (${API_BASE_URL}), Authorization and x-api-key headers are already included. For example, to connect to ${API_BASE_URL}/{consumer_org_id}/providers, only /{consumer_org_id}/providers is entered in this field.`,
      example: "/{consumer_org_id}/providers",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    try {
      const { data } = await sendRawRequest(
        API_BASE_URL,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${connection.token?.access_token}`,
          "x-api-key": `${connection.fields.clientId}`,
        },
      );
      return { data };
    } catch (error) {
      requestErrorHandler(error);
    }
  },
});
