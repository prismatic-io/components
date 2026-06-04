import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getHeaders, validateConnection } from "../client";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Paylocity",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/companies/{companyId}/employees/{employeeId}/additionalRates), The base URL is already included (https://api.paylocity.com/api/v2). For example, to connect to https://api.paylocity.com/api/v2/companies/{companyId}/employees/{employeeId}/additionalRates, only /companies/{companyId}/employees/{employeeId}/additionalRates is entered in this field.",
      example: "/companies/{companyId}/employees/{employeeId}/additionalRates",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const url = util.types.toString(connection.fields.apiUrl);
    const headers = await getHeaders(connection);
    const { data } = await sendRawRequest(
      url,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      headers,
    );
    return { data };
  },
});

export default rawRequest;
