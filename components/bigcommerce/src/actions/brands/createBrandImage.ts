import FormData from "form-data";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createBrandImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  brandId,
  imageFile,
  storeHash,
} from "../../inputs";

export const createBrandImage = action({
  display: {
    label: "Create Brand Image",
    description: "Uploads an image for a brand.",
  },
  examplePayload: createBrandImageExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, brandId, imageFile },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/brands/${brandId}/image`;

    const formData = new FormData();
    formData.append("image_file", imageFile);

    const headers = {
      ...formData.getHeaders(),
    };

    try {
      const response = await client.post(endpoint, formData, { headers });

      return {
        data: response.data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: { bigCommerceConnection, storeHash, brandId, imageFile },
});
