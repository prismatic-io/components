import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { authorizationHeaders, baseUrl } from "../client";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Marketo",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: { ...rawRequestInputs.url, example: "/v1/leads.json" },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      baseUrl(connection),
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      await authorizationHeaders(connection, context.debug.enabled),
    );
    return { data };
  },
});

export default rawRequest;
