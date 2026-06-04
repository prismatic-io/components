import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteBrandExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  brandIdToDelete,
  storeHash,
} from "../../inputs";

export const deleteBrand = action({
  display: {
    label: "Delete Brand",
    description: "Deletes a brand by ID.",
  },
  examplePayload: deleteBrandExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, brandIdToDelete },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/brands/${brandIdToDelete}`;

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
  inputs: { bigCommerceConnection, storeHash, brandIdToDelete },
});
