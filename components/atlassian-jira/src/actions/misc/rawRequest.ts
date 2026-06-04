import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getPayload } from "../../connections/auth";
import { connectionInput } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Jira.",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/rest/api/3/project/recent), The base URL is already included (https://api.atlassian.com/ex/jira/<CLOUD_ID>). For example, to connect to https://api.atlassian.com/ex/jira/<CLOUD_ID>/rest/api/3/project/recent, only /rest/api/3/project/recent is entered in this field.",
      default: "/rest/api/3/project/recent",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const config = await getPayload(connection);
    const { auth, host } = config;
    const baseUrl = `https://${host}`;

    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: auth,
        Accept: "application/json",
      },
    );
    
    return { data: { data } };
  },
});
