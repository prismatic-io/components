import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { getFallbackConnectionToken, validateConnection } from "../util";
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Mixpanel",
  },
  inputs: {
    connection: connectionInput,
    baseUrl: {
      ...rawRequestInputs.url,
      label: "Base URL",
      comments:
        "Input the base url you're going to hit. For example, https://api.mixpanel.com/ or https://api-eu.mixpanel.com/",
      example: "https://api.mixpanel.com/",
      required: true,
    },
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/import), The base URL is going to defined in the previous input. For example, to connect to https://api.mixpanel.com/import, only /import is entered in this field and https://api.mixpanel.com/ is entered in the 'Base URL' field.",
      example: "/import",
    },
  },
  perform: async (context, { connection, ...params }) => {
    validateConnection(connection);
    const authorization = getFallbackConnectionToken(connection);
    const { data } = await sendRawRequest(
      params.baseUrl,
      { ...params, debugRequest: context.debug.enabled },
      {
        Authorization: authorization,
      },
    );
    return { data };
  },
});

export default rawRequest;
