import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateProductsBatchExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  storeHash,
  uniqueProductBatch,
} from "../../inputs";

export const updateProductsBatch = action({
  display: {
    label: "Update Products (Batch)",
    description: "Updates products in batches.",
  },
  examplePayload: updateProductsBatchExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, uniqueProductBatch },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products`;

    try {
      const response = await client.put(endpoint, uniqueProductBatch);
      return {
        data: response.data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },

  inputs: {
    bigCommerceConnection,
    storeHash,
    uniqueProductBatch,
  },
});
