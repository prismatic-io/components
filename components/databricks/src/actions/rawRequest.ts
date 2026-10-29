import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getHostAndApiKey } from "../client";
import { rawRequestExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

const { debugRequest: _debugRequest, ...httpInputsWithoutDebug } =
  httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to the Databricks API.",
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { host, apiKey } = getHostAndApiKey(connection);
    const { data } = await sendRawRequest(
      `${host}/api/`,
      {
        ...httpClientInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${apiKey}`,
      },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    ...httpInputsWithoutDebug,
    url: {
      ...httpClientInputs.url,
      comments:
        'The URL https://<WORKSPACE-URL>/api/ is prepended to the URL you provide here. For example, if you provide "/2.0/clusters/list", the full URL will be "https://${host}/api/2.0/clusters/list". You can also provide a full URL with protocol (i.e. "https://accounts.cloud.databricks.com/api/2.0/accounts/{account_id}/scim/v2/Groups" to override the prepended base URL.',
      example: "/2.0/clusters/list",
    },
  },
  examplePayload: rawRequestExamplePayload,
});

export default rawRequest;
