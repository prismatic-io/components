import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Sage HR",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/employees), The base URL is already included (https://subdomain.sage.hr/api/). For example, to connect to https://subdomain.sage.hr/api/employees, only /employees is entered in this field.",
      example: "/employees",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { subdomain, apiKey } = connection.fields;
    if (!subdomain || !apiKey) {
      throw new Error("Unable to authenticate");
    }
    const url = `https://${util.types.toString(subdomain)}.sage.hr/api/`;
    const { data } = await sendRawRequest(
      url,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        "X-Auth-Token": util.types.toString(apiKey),
      },
    );
    return { data };
  },
});

export default rawRequest;
