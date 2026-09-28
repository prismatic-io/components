import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";
export const query = input({
  label: "GraphQL Query",
  type: "code",
  required: true,
  language: "graphql",
  comments:
    "The GraphQL operation to send to the store's `/graphql` endpoint. The default value is a placeholder outline; replace it with the query or mutation to run.",
  placeholder: "Enter a GraphQL query",
  default: `query myCartQuery{
    cart(cart_id: String!): Cart
  }`,
  clean: util.types.toString,
});
export const store = input({
  label: "Store",
  type: "string",
  required: true,
  comments:
    "The hostname of the storefront that receives the GraphQL request. The request is sent to `https://<host>/graphql`, so this must be a bare host with no scheme and no path.",
  placeholder: "Enter a store hostname",
  example: "www.example.com",
  clean: util.types.toString,
});
export const graphQLRawRequestInputs = {
  connection: connectionInput,
  store,
  query,
};
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;
export const restRawRequestInputs = {
  connection: connectionInput,
  ...rawRequestInputs,
  url: {
    ...rawRequestInputs.url,
    comments:
      "Input the path only. The base URL comes from the connection: the Store URL for the OAuth 1.0a connection, or the Marketplace sandbox or production host for the API Access Key connection. The path is appended to that base as-is, so a store REST path includes its `/rest/<store_code>/V1` prefix, where `<store_code>` is whatever the OAuth 1.0a connection's Store Code field holds (for example, `/rest/default/V1/orders` for the default store view).",
    example: "/rest/default/V1/orders",
  },
};
