import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteCustomFieldExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  customFieldIdToDelete,
  productCustomFieldsProductId,
  storeHash,
} from "../../inputs";

export const deleteCustomField = action({
  display: {
    label: "Delete Custom Field",
    description: "Deletes a product custom field.",
  },
  examplePayload: deleteCustomFieldExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      productCustomFieldsProductId,
      customFieldIdToDelete,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productCustomFieldsProductId}/custom-fields/${customFieldIdToDelete}`;

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
    productCustomFieldsProductId,
    customFieldIdToDelete,
  },
});
