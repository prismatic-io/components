import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateCategoriesExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  category_id_update,
  storeHash,
  tree_id_update,
} from "../../inputs";

export const updateCategories = action({
  display: {
    label: "Update Categories",
    description: "Updates existing categories in BigCommerce.",
  },
  examplePayload: updateCategoriesExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, tree_id_update, category_id_update },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/trees/categories`;

    if (typeof tree_id_update !== "string") {
      throw new Error("tree_id_update must be a string");
    }

    if (typeof category_id_update !== "string") {
      throw new Error("category_id_update must be a string");
    }

    const treeId = parseInt(tree_id_update, 10);
    const categoryId = parseInt(category_id_update, 10);

    const body = [
      {
        tree_id: treeId,
        category_id: categoryId,
      },
    ];

    try {
      const response = await client.put(endpoint, body);

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
    tree_id_update,
    category_id_update,
  },
});
