import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createBrandExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  brandNameToCreate,
  imageUrl,
  metaDescription,
  metaKeywords,
  pageTitle,
  searchKeywords,
  storeHash,
} from "../../inputs";

export const createBrand = action({
  display: {
    label: "Create Brand",
    description: "Creates a new brand in the store.",
  },
  examplePayload: createBrandExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      brandNameToCreate,
      pageTitle,
      metaKeywords,
      metaDescription,
      searchKeywords,
      imageUrl,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/brands`;

    const body = {
      name: brandNameToCreate,
      page_title: pageTitle,
      meta_keywords: metaKeywords,
      meta_description: metaDescription,
      search_keywords: searchKeywords,
      image_url: imageUrl,
    };

    try {
      const response = await client.post(endpoint, body);

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
    brandNameToCreate,
    pageTitle,
    metaKeywords,
    metaDescription,
    searchKeywords,
    imageUrl,
  },
});
