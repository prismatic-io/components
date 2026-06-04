import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Azure Service Bus",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const baseUrl = "https://management.azure.com/subscriptions";
    const token = connection?.token?.access_token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const { data } = await sendRawRequest(
        baseUrl,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        headers,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/{subscriptionId}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01), The base URL is already included (https://management.azure.com/subscriptions). For example, to connect to https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01, only /{subscriptionId}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01 is entered in this field.",
      example:
        "/{subscriptionId}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01",
    },
  },
});
