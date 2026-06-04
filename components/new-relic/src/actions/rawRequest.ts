import { action, util } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";

import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to New Relic",
  },
  inputs: {
    connection: connectionInput,
    baseUrl: {
      label: "Base URL",
      type: "string",
      required: true,
      default: "https://api.newrelic.com/v2",
      clean: util.types.toString,
    },
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/labels.json), The base URL is already included (https://api.newrelic.com/v2). For example, to connect to https://api.newrelic.com/v2/labels.json, only /labels.json is entered in this field.",
      example: "/labels.json",
    },
  },
  perform: async (context, { connection, baseUrl, ...rawRequestInputs }) => {
    try {
      const { data } = await sendRawRequest(
        baseUrl,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          "Api-Key": util.types.toString(connection.fields.apiKey),
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequest;
