import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { getAuthorization, getBaseUrl } from "../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to WooCommerce",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const baseUrl = getBaseUrl(connection);
    const headers = {
      Authorization: getAuthorization(connection),
    };
    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      headers,
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/reports), The base URL is already included (https://{input_domain}/wp-json/wc/v3). For example, to connect to https://{input_domain}/wp-json/wc/v3/reports, only /reports is entered in this field.",
      example: "/reports",
    },
  },
});
