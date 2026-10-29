import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getCategoryExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  categoryId,
  excludeFields,
  includeFields,
  storeHash,
} from "../../inputs";

export const getCategory = action({
  display: {
    label: "Get Category",
    description: "Returns a single category.",
  },
  examplePayload: getCategoryExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      categoryId,
      includeFields,
      excludeFields,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/categories/${categoryId}`;
    const params: Record<string, unknown> = {};

    if (includeFields) {
      params.include_fields = includeFields;
    }
    if (excludeFields) {
      params.exclude_fields = excludeFields;
    }

    try {
      const response = await client.get(endpoint, { params });

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
    includeFields,
    excludeFields,
  },
});
