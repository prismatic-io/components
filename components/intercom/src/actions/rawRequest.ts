import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getClientProps } from "../client";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw request to Intercom",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { baseUrl, accessToken } = getClientProps(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
  },
});
