import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../../inputs";
import { getBaseURL, getRealmId } from "../../util";

const { debugRequest: _, ...rest } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to QuickBooks.",
  },
  inputs: {
    connection: connectionInput,
    ...rest,
    url: {
      ...rest.url,
      comments:
        "Input the path only (/invoice), The base URL is already included (https://quickbooks.api.intuit.com/v3/company/1234567890 for production or https://sandbox-quickbooks.api.intuit.com/v3/company/1234567890 for sandbox). For example, to connect to https://quickbooks.api.intuit.com/v3/company/1234567890/invoice, only /invoice is entered in this field.",
      example: "/invoice",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const accessToken = connection.token.access_token;
    const realmId = getRealmId(connection);
    const rootUrl = getBaseURL(connection);

    const { url } = rawRequestInputs;

    const fullURL = url.startsWith("/v3/company/")
      ? url
      : `/v3/company/${realmId}/${url}`;

    const { data } = await sendRawRequest(
      rootUrl,
      {
        ...rawRequestInputs,
        url: fullURL,
        debugRequest: context.debug.enabled,
      },
      { Authorization: `Bearer ${accessToken}` },
    );

    
    if (rawRequestInputs.url.includes("/invoice")) {
      return {
        data: data.Invoice || data.Invoices || data,
      };
    }

    return { data };
  },
});
