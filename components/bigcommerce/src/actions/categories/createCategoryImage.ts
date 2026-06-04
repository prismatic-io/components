import FormData from "form-data";
import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createCategoryImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  categoryId,
  imageFile,
  storeHash,
} from "../../inputs";

export const createCategoryImage = action({
  display: {
    label: "Create Category Image",
    description: "Uploads an image for a specific category.",
  },
  examplePayload: createCategoryImageExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, categoryId, imageFile },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/categories/${categoryId}/image`;

    const formData = new FormData();
    formData.append("image_file", imageFile);

    try {
      const response = await client.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    imageFile,
  },
});
