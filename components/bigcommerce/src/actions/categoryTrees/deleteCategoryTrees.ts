import querystring from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteCategoryTreesExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, category_id_in, storeHash } from "../../inputs";

export const deleteCategoryTrees = action({
  display: {
    label: "Delete Category Trees",
    description: "Deletes specific category trees.",
  },
  examplePayload: deleteCategoryTreesExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, category_id_in },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/trees`;

    const queryParams = querystring.stringify({
      "id:in": category_id_in as string,
    });

    try {
      const response = await client.delete(`${endpoint}?${queryParams}`);

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
    category_id_in,
  },
});
