import querystring from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getCategoryTreeExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, depth, storeHash, tree_id } from "../../inputs";

export const getCategoryTree = action({
  display: {
    label: "Get Category Tree",
    description: "Returns a category tree.",
  },
  examplePayload: getCategoryTreeExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, tree_id, depth },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/trees/${tree_id}/categories`;

    const queryParams = querystring.stringify({
      depth: depth as number,
    });

    try {
      const response = await client.get(`${endpoint}?${queryParams}`);

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
    tree_id,
    depth,
  },
});
