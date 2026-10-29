import querystring from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getAllCategoriesSimpleExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  category_id_in,
  limit,
  page,
  storeHash,
} from "../../inputs";

export const getAllCategoriesSimple = action({
  display: {
    label: "List Categories (Simplified)",
    description: "Returns a list of categories.",
  },
  examplePayload: getAllCategoriesSimpleExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, category_id_in, limit, page },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/trees/categories`;

    const queryParams = querystring.stringify({
      "category_id:in": category_id_in as string,
      limit: limit as number,
      page: page as number,
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
    category_id_in,
    limit,
    page,
  },
});
