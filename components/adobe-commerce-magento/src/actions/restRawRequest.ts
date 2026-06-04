import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getConfig } from "../client";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const restRawRequest = action({
  display: {
    label: "REST Raw Request",
    description: "Send raw HTTP request to Adobe Commerce",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const config = await getConfig(connection, context.debug.enabled);
    try {
      const { data } = await sendRawRequest(
        config.environmentUrl,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${config.token}`,
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/orders), The base URL is already included (https://commercedeveloper-sandbox-api.adobe.com for sandbox or https://commercedeveloper-api.adobe.com for production). For example, to connect to https://commercedeveloper-sandbox-api.adobe.com/orders, only /orders is entered in this field.",
      example: "/orders",
    },
  },
});

export default { restRawRequest };
