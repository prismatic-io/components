import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createCategoryTreeExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  categoryNameTree,
  parent_id_Tree,
  storeHash,
} from "../../inputs";

export const createCategoryTree = action({
  display: {
    label: "Create Category Tree",
    description: "Creates a new category tree in BigCommerce.",
  },
  examplePayload: createCategoryTreeExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, parent_id_Tree, categoryNameTree },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/categories`;

    if (typeof parent_id_Tree !== "string") {
      throw new Error("parent_id_Tree must be a string");
    }

    const parentId = parseInt(parent_id_Tree, 10);

    const body = {
      parent_id: parentId,
      name: categoryNameTree,
    };

    try {
      const response = await client.post(endpoint, body);

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
    parent_id_Tree,
    categoryNameTree,
  },
});
