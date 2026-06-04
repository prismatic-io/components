import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { listBrandsExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  brandName,
  pageLimit,
  storeHash,
} from "../../inputs";

export const listBrands = action({
  display: {
    label: "List Brands",
    description: "Returns a list of all of the store's brands.",
  },
  examplePayload: listBrandsExamplePayload,
  perform: async (
    context,
    { bigCommerceConnection, storeHash, brandName, pageLimit },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    let endpoint = `/stores/${storeHash}/v3/catalog/brands`;

    if (brandName) {
      endpoint += `?name=${brandName}`;
    }
    if (pageLimit) {
      const separator = endpoint.includes("?") ? "&" : "?";
      endpoint += `${separator}limit=${pageLimit}`;
    }

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
  inputs: { bigCommerceConnection, storeHash, brandName, pageLimit },
});
