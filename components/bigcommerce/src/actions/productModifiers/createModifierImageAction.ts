import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createModifierImageExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  createModifierImageFile,
  createModifierImageValueId,
  createModifierProductId,
  getModifierId,
  storeHash,
} from "../../inputs";

export const createModifierImageAction = action({
  display: {
    label: "Create Modifier Image",
    description: "Creates an image for a product modifier value.",
  },
  examplePayload: createModifierImageExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      product_id,
      modifier_id,
      value_id,
      image_file,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${product_id}/modifiers/${modifier_id}/values/${value_id}/image`;

    const formattedImageFile = image_file;

    try {
      const response = await client.post(endpoint, formattedImageFile, {
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
    storeHash: storeHash,
    product_id: createModifierProductId,
    modifier_id: getModifierId,
    value_id: createModifierImageValueId,
    image_file: createModifierImageFile,
  },
});
