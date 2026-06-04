import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { upsertCategoryTreesExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  categoryTreeData,
  storeHash,
} from "../../inputs";

export const upsertCategoryTrees = action({
  display: {
    label: "Upsert Category Trees",
    description:
      "Upserts Category Trees. This single endpoint updates and creates category trees.",
  },
  examplePayload: upsertCategoryTreesExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, categoryTreeData },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/trees`;

    try {
      const response = await client.put(endpoint, categoryTreeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    categoryTreeData,
  },
});
