import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { getHeaders } from "../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Xero",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/Accounts), The base URL is already included (https://api.xero.com/api.xro/2.0). For example, to connect to https://api.xero.com/api.xro/2.0/Accounts, only /Accounts is entered in this field.",
      example: "/Accounts",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const headers = await getHeaders(connection, context.debug.enabled);
    const { data } = await sendRawRequest(
      "https://api.xero.com/api.xro/2.0",
      {
        debugRequest: context.debug.enabled,
        ...rawRequestInputs,
      },
      headers,
    );
    return { data };
  },
});

export default rawRequest;
