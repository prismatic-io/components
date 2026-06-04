import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { toAuthorizationHeaders } from "../../client";
import { connectionInput, apiVersion } from "../../inputs";
import { BASE_URL } from "../../constants";
import { getBaseUrl } from "../../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Pipedrive.",
  },
  inputs: {
    version: apiVersion,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/files), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/files, only /files is entered in this field.`,
      example: "/files",
    },
    connection: connectionInput,
  },
  perform: async (context, { connection, version, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      getBaseUrl(version),
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        ...toAuthorizationHeaders(connection),
        Accept: "application/json",
      },
    );
    return { data };
  },
});
