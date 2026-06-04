import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { deleteCategoriesExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  id,
  id_greater,
  id_in,
  id_less,
  id_max,
  id_min,
  id_not_in,
  isVisible,
  keyword,
  name,
  name_like,
  pageTitle,
  pageTitle_like,
  parentId,
  parent_id_greater,
  parent_id_in,
  parent_id_less,
  parent_id_max,
  parent_id_min,
  storeHash,
} from "../../inputs";

export const deleteCategories = action({
  display: {
    label: "Delete Categories",
    description: "Deletes categories based on provided filters.",
  },
  examplePayload: deleteCategoriesExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      id,
      id_in,
      id_not_in,
      id_min,
      id_max,
      id_greater,
      id_less,
      name,
      parentId,
      pageTitle,
      keyword,
      isVisible,
      name_like,
      parent_id_in,
      parent_id_min,
      parent_id_max,
      parent_id_greater,
      parent_id_less,
      pageTitle_like,
    },
  ) => {
    const client = await createAuthorizedClient(
      bigCommerceConnection,
      context.debug.enabled,
    );

    const endpoint = `/stores/${storeHash}/v3/catalog/categories`;

    const params = {
      id,
      "id:in": id_in,
      "id:not_in": id_not_in,
      "id:min": id_min,
      "id:max": id_max,
      "id:greater": id_greater,
      "id:less": id_less,
      name,
      parent_id: parentId,
      page_title: pageTitle,
      keyword,
      is_visible: isVisible,
      "name:like": name_like,
      "parent_id:in": parent_id_in,
      "parent_id:min": parent_id_min,
      "parent_id:max": parent_id_max,
      "parent_id:greater": parent_id_greater,
      "parent_id:less": parent_id_less,
      "page_title:like": pageTitle_like,
    };

    try {
      const response = await client.delete(endpoint, { params });

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
    id,
    id_in,
    id_not_in,
    id_min,
    id_max,
    id_greater,
    id_less,
    name,
    parentId,
    pageTitle,
    keyword,
    isVisible,
    name_like,
    parent_id_in,
    parent_id_min,
    parent_id_max,
    parent_id_greater,
    parent_id_less,
    pageTitle_like,
  },
});
