import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateCustomFieldExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  customFieldIdToUpdate,
  customFieldName,
  customFieldValue,
  productCustomFieldsProductId,
  storeHash,
} from "../../inputs";

export const updateCustomField = action({
  display: {
    label: "Update Custom Field",
    description: "Updates a custom field for a product.",
  },
  examplePayload: updateCustomFieldExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      productCustomFieldsProductId,
      customFieldIdToUpdate,
      customFieldName,
      customFieldValue,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productCustomFieldsProductId}/custom-fields/${customFieldIdToUpdate}`;

    const requestBody = {
      id: customFieldIdToUpdate,
      name: customFieldName,
      value: customFieldValue,
    };

    try {
      const response = await client.put(endpoint, requestBody);
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
    customFieldIdToUpdate,
    customFieldName,
    customFieldValue,
  },
});
