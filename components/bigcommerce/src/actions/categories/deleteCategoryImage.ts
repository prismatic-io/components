import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteCategoryImageExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, categoryId, storeHash } from "../../inputs";

export const deleteCategoryImage = action({
  display: {
    label: "Delete Category Image",
    description: "Deletes an image associated with a given category.",
  },
  examplePayload: deleteCategoryImageExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, categoryId },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/categories/${categoryId}/image`;

    try {
      const response = await client.delete(endpoint);

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
    categoryId,
  },
});
