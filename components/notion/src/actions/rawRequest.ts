import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { baseUrl, getAuthorizationHeader, notionVersion } from "../client";
import { rawRequestResponse } from "../examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Notion",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/users/me), The base URL is already included (${baseUrl}). For example, to connect to ${baseUrl}/users/me, only /users/me is entered in this field.`,
      example: "/users/me",
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
        Authorization: getAuthorizationHeader(connection),
        "Notion-Version": notionVersion,
      },
    );
    return { data };
  },
  examplePayload: rawRequestResponse,
});

export default rawRequest;
