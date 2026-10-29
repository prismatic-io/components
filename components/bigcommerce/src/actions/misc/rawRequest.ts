import { action, ConnectionError, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, storeHash } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to BigCommerce.",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    ...rawRequestInputs,
    bigCommerceConnection,
    storeHash,
    url: {
      ...rawRequestInputs.url,
      example: "/v3/catalog/brands",
    },
  },
  perform: async (
    context,
    { bigCommerceConnection, storeHash, ...rawRequestInputs },
  ) => {
    if (!bigCommerceConnection || !storeHash) {
      throw new ConnectionError(
        bigCommerceConnection,
        `Invalid connection or storeHash not provided.`,
      );
    }

    const baseUrl = `https://api.bigcommerce.com/stores/${storeHash}`;
    const { accessToken } = bigCommerceConnection.fields;

    try {
      const { data } = await sendRawRequest(
        baseUrl,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          "X-Auth-Token": accessToken as string,
          "Content-Type": "application/json",
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
