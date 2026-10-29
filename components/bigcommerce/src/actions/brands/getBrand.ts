import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getBrandExamplePayload } from "../../examplePayloads";
import { bigCommerceConnection, brandId, storeHash } from "../../inputs";

export const getBrand = action({
  display: {
    label: "Get Brand",
    description: "Retrieves details of a specific brand.",
  },
  examplePayload: getBrandExamplePayload,
  perform: async (context, { bigCommerceConnection, storeHash, brandId }) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/brands/${brandId}`;

    try {
      const response = await client.get(endpoint);

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
