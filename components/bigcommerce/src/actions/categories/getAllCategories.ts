import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { getAllCategoriesExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  exclude_fields,
  id,
  id_greater,
  id_in,
  id_less,
  id_max,
  id_min,
  id_not_in,
  include_fields,
  is_visible,
  keyword,
  limit,
  name,
  name_like,
  page,
  page_title,
  page_title_like,
  parent_id,
  parent_id_greater,
  parent_id_in,
  parent_id_less,
  parent_id_max,
  parent_id_min,
  storeHash,
} from "../../inputs";

export const getAllCategories = action({
  display: {
    label: "List Categories",
    description: "Returns a list of categories with optional filters.",
  },
  examplePayload: getAllCategoriesExamplePayload,
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
      name_like,
      parent_id,
      parent_id_in,
      parent_id_min,
      parent_id_max,
      parent_id_greater,
      parent_id_less,
      page_title,
      page_title_like,
      keyword,
      is_visible,
      page,
      limit,
      include_fields,
      exclude_fields,
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
      "name:like": name_like,
      parent_id,
      "parent_id:in": parent_id_in,
      "parent_id:min": parent_id_min,
      "parent_id:max": parent_id_max,
      "parent_id:greater": parent_id_greater,
      "parent_id:less": parent_id_less,
      page_title,
      "page_title:like": page_title_like,
      keyword,
      is_visible,
      page,
      limit,
      include_fields,
      exclude_fields,
    };

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
    id,
    id_in,
    id_not_in,
    id_min,
    id_max,
    id_greater,
    id_less,
    name,
    name_like,
    parent_id,
    parent_id_in,
    parent_id_min,
    parent_id_max,
    parent_id_greater,
    parent_id_less,
    page_title,
    page_title_like,
    keyword,
    is_visible,
    page,
    limit,
    include_fields,
    exclude_fields,
  },
});
