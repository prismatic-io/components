import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { updateCategoryExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  categoryDescription,
  categoryId,
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

export const updateCategory = action({
  display: {
    label: "Update Category",
    description: "Updates an existing category in BigCommerce.",
  },
  examplePayload: updateCategoryExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      categoryId,
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

    const endpoint = `/stores/${storeHash}/v3/catalog/categories/${categoryId}`;

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
      const response = await client.put(endpoint, body);

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
