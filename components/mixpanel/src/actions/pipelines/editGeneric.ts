import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, dataAndDomain, name } from "../../inputs";
import { getFallbackConnectionToken } from "../../util";
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const editGenericPipeline = action({
  display: {
    label: "Edit Generic Pipeline",
    description: "This request edit the params for an export pipeline.",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    name,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      default: "/nessie/pipeline/edit",
      comments:
        "The endpoint to send the request to. Defaults to /nessie/pipeline/edit.",
    },
  },
  perform: async (context, { connection, dataAndDomain, ...params }) => {
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
