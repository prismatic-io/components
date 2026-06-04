import { action } from "@prismatic-io/spectral";
import {
  categoryDescription,
  categoryId,
  categoryName,
  connectionInput,
  locale,
  position,
} from "../../inputs";
import { updateCategoryPayload } from "../../examplePayloads";
import { rawHttpClient } from "../../auth";
import type { Category } from "../../types";

export const updateCategory = action({
  display: {
    label: "Update Category",
    description: "Update a category in the Help Center.",
  },
  perform: async (
    context,
    {
      categoryDescription,
      categoryName,
      locale,
      position,
      categoryId,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      category: {
        name: categoryName || undefined,
        description: categoryDescription || undefined,
        locale: locale || undefined,
        position: position || undefined,
      },
    };

    const { data } = await client.put<{ category: Category }>(
      `/help_center/categories/${categoryId}`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    categoryId,
    locale: {
      ...locale,
      required: false,
      comments: "The locale of the category to be updated.",
    },
    categoryName: {
      ...categoryName,
      required: false,
      comments: "The name of the category to be updated.",
    },
    categoryDescription: {
      ...categoryDescription,
      required: false,
      comments: "The description of the category to be updated.",
    },
    position: {
      ...position,
      comments: "The position of the category to be updated.",
    },
  },
  examplePayload: { data: updateCategoryPayload },
});
