import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../client";
import { connectionInput } from "../inputs";
import { getAccessToken, getBaseUrl, getHeaders } from "../util";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Amazon Seller Central",
  },
  inputs: {
    connection: connectionInput,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/orders/v0/orders), The base URL is already included (https://sellingpartnerapi-na.amazon.com/). For example, to connect to https://sellingpartnerapi-na.amazon.com/orders/v0/orders, only /orders/v0/orders is entered in this field.",
      example: "/orders/v0/orders",
    },
  },
  perform: async (_context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const accessToken = getAccessToken(connection);
    const baseUrl = getBaseUrl(connection);
    const { data } = await sendRawRequest(
      `https://${baseUrl}`,
      httpClientInputs,
      getHeaders(baseUrl, accessToken),
    );
    return { data };
  },
});

export default rawRequest;
