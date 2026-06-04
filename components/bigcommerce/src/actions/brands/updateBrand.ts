import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateBrandExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  brandIdToUpdate,
  newBrandName,
  newImageUrl,
  newPageTitle,
  storeHash,
} from "../../inputs";

export const updateBrand = action({
  display: {
    label: "Update Brand",
    description: "Updates a brand's details.",
  },
  examplePayload: updateBrandExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      brandIdToUpdate,
      newBrandName,
      newPageTitle,
      newImageUrl,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/brands/${brandIdToUpdate}`;

    const body = {
      name: newBrandName,
      page_title: newPageTitle,
      image_url: newImageUrl,
    };

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
    brandIdToUpdate,
    newBrandName,
    newPageTitle,
    newImageUrl,
  },
});
