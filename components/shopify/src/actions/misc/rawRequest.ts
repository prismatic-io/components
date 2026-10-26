import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getShopifyHostname } from "../../client";
import { rawRequestInputs as inputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request (Deprecated)",
    description:
      "Sends a raw HTTP request to Shopify. This version of the action uses REST and is being deprecated. Please replace action with the Raw Request utilizing GraphQL.",
  },
  inputs,
  performSafety: "notAllowed",
  perform: async (
    _context,
    { connection, apiVersion, returnHeaders, ...httpClientInputs },
  ) => {
    const shopifyHostname = getShopifyHostname(
      util.types.toString(connection.fields.host),
    );
    const { data, headers } = await sendRawRequest(
      `https://${shopifyHostname}/admin/api/${apiVersion}`,
      httpClientInputs,
      {
        "Content-type": "application/json",
        "X-Shopify-Access-Token": util.types.toString(
          connection.token?.access_token ||
            connection.fields.adminApiAccessToken,
        ),
      },
    );
    if (returnHeaders) {
      return { data: { data, headers } };
    }
    return { data };
  },
});
