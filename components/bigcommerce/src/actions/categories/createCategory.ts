import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { createCategoryExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  categoryDescription,
  categoryName,
  customUrl,
  defaultProductSort,
  imageUrl,
  isVisible,
  layoutFile,
  metaDescription,
  metaKeywords,
  pageTitle,
  parentId,
  searchKeywords,
  sortOrder,
  storeHash,
  views,
} from "../../inputs";

export const createCategory = action({
  display: {
    label: "Create Category",
    description: "Creates a new category in BigCommerce.",
  },
  examplePayload: createCategoryExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      parentId,
      categoryName,
      categoryDescription,
      views,
      sortOrder,
      pageTitle,
      searchKeywords,
      metaKeywords,
      metaDescription,
      layoutFile,
      isVisible,
      defaultProductSort,
      imageUrl,
      customUrl,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/categories`;

    const body = {
      parent_id: Number(parentId),
      name: categoryName,
      description: categoryDescription,
      views: Number(views),
      sort_order: Number(sortOrder),
      page_title: pageTitle,
      search_keywords: searchKeywords,
      meta_keywords: metaKeywords,
      meta_description: metaDescription,
      layout_file: layoutFile,
      is_visible: isVisible,
      default_product_sort: defaultProductSort,
      image_url: imageUrl,
      custom_url: customUrl,
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
    parentId,
    categoryName,
    categoryDescription,
    views,
    sortOrder,
    pageTitle,
    searchKeywords,
    metaKeywords,
    metaDescription,
    layoutFile,
    isVisible,
    defaultProductSort,
    imageUrl,
    customUrl,
  },
});
