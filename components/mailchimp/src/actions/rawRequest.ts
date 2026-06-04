import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { parseConnection } from "../client";

const { debugRequest: _debugRequest, ...httpClientInputsWithoutDebug } =
  httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Mailchimp",
  },
  inputs: {
    connection: connectionInput,
    ...httpClientInputsWithoutDebug,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/reporting/facebook-ads), The base URL is already included (https://${dc}.api.mailchimp.com/3.0). For example, to connect to https://${dc}.api.mailchimp.com/3.0/reporting/facebook-ads, only /reporting/facebook-ads is entered in this field.",
      example: "/reporting/facebook-ads",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { baseUrl, basicAuth } = await parseConnection(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Basic ${basicAuth}`,
      },
    );
    return { data };
  },
});

export default rawRequest;
