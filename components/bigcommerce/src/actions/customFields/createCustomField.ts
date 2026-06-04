import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createCustomFieldExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  customFieldName,
  customFieldValue,
  productCustomFieldsProductId,
  storeHash,
} from "../../inputs";

export const createCustomField = action({
  display: {
    label: "Create Custom Field",
    description: "Creates a custom field for a product.",
  },
  examplePayload: createCustomFieldExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      productCustomFieldsProductId,
      customFieldName,
      customFieldValue,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );
    const endpoint = `/stores/${storeHash}/v3/catalog/products/${productCustomFieldsProductId}/custom-fields`;

    const requestBody = {
      name: customFieldName,
      value: customFieldValue,
    };

    try {
      const response = await client.post(endpoint, requestBody);
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
    customFieldName,
    customFieldValue,
  },
});
