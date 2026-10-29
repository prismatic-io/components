import querystring from "node:querystring";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getAllCategoryTreesExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  category_id_in,
  channelId_in,
  storeHash,
} from "../../inputs";

export const getAllCategoryTrees = action({
  display: {
    label: "List Category Trees",
    description: "Returns a list of category trees.",
  },
  examplePayload: getAllCategoryTreesExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, category_id_in, channelId_in },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/trees`;

    const queryParams = querystring.stringify({
      "id:in": category_id_in as string,
      "channel_id:in": channelId_in as string,
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
    channelId_in,
  },
});
