import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getCatalogSummaryExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, storeHash } from "../../inputs";

export const getCatalogSummaryAction = action({
  display: {
    label: "Get Catalog Summary",
    description:
      "Returns a lightweight inventory summary from the BigCommerce Catalog.",
  },
  examplePayload: getCatalogSummaryExamplePayload,
  perform: async (context, { bigCommerceConnection, storeHash }) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/summary`;

    try {
      const response = await client.get(endpoint);
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
    storeHash: storeHash,
  },
});
