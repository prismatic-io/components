import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, dataAndDomain } from "../../inputs";
import { getFallbackConnectionToken, validateConnection } from "../../util";
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const createGenericPipeline = action({
  display: {
    label: "Create Generic Pipeline",
    description: "This request creates an export pipeline.",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      default: "/nessie/pipeline/create",
      comments:
        "The endpoint to send the request to. Defaults to /nessie/pipeline/create.",
    },
  },
  perform: async (context, { connection, dataAndDomain, ...params }) => {
    validateConnection(connection);
    const baseUrl = `https://${dataAndDomain}.mixpanel.com/api/2.0/`;
    const authorization = getFallbackConnectionToken(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...params, debugRequest: context.debug.enabled },
      {
        Authorization: authorization,
      },
    );
    return { data };
  },
});
