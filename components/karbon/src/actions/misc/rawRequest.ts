import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

import {
  cleanOdata,
  getCredentialsFromConnection,
  validateConnection,
} from "../../utils";
import { BASE_URL } from "../../constants";
import { connection } from "../../inputs/shared";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Karbon",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const { applicationId, accessKey } =
      getCredentialsFromConnection(connection);

    const { data, headers } = await sendRawRequest(
      BASE_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        AccessKey: accessKey,
        Authorization: `Bearer ${applicationId}`,
      },
    );

    return { data: { data: cleanOdata(data), headers } };
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/v3/ClientGroups), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/v3/ClientGroups, only /v3/ClientGroups is entered in this field.`,
      example: "/v3/ClientGroups",
      placeholder: "/v3/ClientGroups",
    },
  },
});
