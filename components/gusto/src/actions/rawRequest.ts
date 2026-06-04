import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { apiVersionInput, connectionInput } from "../inputs";
import { getBaseUrl } from "../client";

const { debugRequest: _, ...rest } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Gusto",
  },
  inputs: {
    connection: connectionInput,
    apiVersion: apiVersionInput,
    ...rest,
    url: {
      ...rest.url,
      comments:
        "Input the path only (/provision), The base URL is already included (https://api.gusto.com/v1). For example, to connect to https://api.gusto.com/v1/provision, only /provision is entered in this field.",
      example: "/provision",
    },
  },
  perform: async (context, { connection, apiVersion, ...rest }) => {
    const { data, headers } = await sendRawRequest(
      getBaseUrl(connection),
      {
        ...rest,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${connection.token?.access_token}`,
        "X-Gusto-API-Version": apiVersion,
      },
    );
    return { data: { data, headers } };
  },
});

export default rawRequest;
