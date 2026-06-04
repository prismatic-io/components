import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { version, connectionInput } from "../../inputs";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Salesforce.",
  },
  perform: async (context, { connection, version, ...rawRequestInputs }) => {
    const sfClient = await createSalesforceClient(connection, version);
    const baseUrl = `${sfClient.instanceUrl}/services/data/v${version}`;

    const { data } = await sendRawRequest(
      baseUrl,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${sfClient.accessToken}`,
      },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/chatter/feeds/record/), The base URL is already included (https://<YOUR_INSTANCE_URL_COMING_FROM_CONNECTION>/services/data/v<YOUR_INPUT_VERSION>). For example, to connect to https://instance_name/services/data/v58.0/chatter/feeds/record/, only /chatter/feeds/record/ is entered in this field.",
      example: "/chatter/feeds/record/",
    },
  },
});
