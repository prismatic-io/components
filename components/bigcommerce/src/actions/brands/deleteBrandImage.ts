import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteBrandImageExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, brandId, storeHash } from "../../inputs";

export const deleteBrandImage = action({
  display: {
    label: "Delete Brand Image",
    description: "Deletes an image for a brand by ID.",
  },
  examplePayload: deleteBrandImageExamplePayload,
  perform: async (context, { bigCommerceConnection, storeHash, brandId }) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/brands/${brandId}/image`;

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
  inputs: { bigCommerceConnection, storeHash, brandId },
});
