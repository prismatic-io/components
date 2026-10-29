import querystring from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteCategoriesTreeExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  category_id,
  category_uuid,
  parent_id,
  storeHash,
  tree_id,
} from "../../inputs";

export const deleteCategoriesTree = action({
  display: {
    label: "Delete Categories from Tree",
    description:
      "Deletes specified categories from a category tree in BigCommerce.",
  },
  examplePayload: deleteCategoriesTreeExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      category_uuid,
      category_id,
      tree_id,
      parent_id,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/trees/categories`;

    const queryParams = querystring.stringify({
      "category_uuid:in": category_uuid as string,
      "category_id:in": category_id as string,
      "tree_id:in": tree_id as string,
      "parent_id:in": parent_id as string,
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
    category_uuid,
    category_id,
    tree_id,
    parent_id,
  },
});
