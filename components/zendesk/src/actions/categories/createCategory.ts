import { action } from "@prismatic-io/spectral";
import {
  categoryDescription,
  categoryName,
  connectionInput,
  locale,
  position,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Category } from "../../types";
import { createCategoryPayload } from "../../examplePayloads";

export const createCategory = action({
  display: {
    label: "Create Category",
    description: "Create a category in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, categoryDescription, categoryName, locale, position },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      category: {
        name: categoryName,
        locale: locale,
        position: position,
        description: categoryDescription,
      },
    };

    const { data } = await client.post<{ category: Category }>(
      `/help_center/${locale}/categories`,
      payload,
    );

    return { data };
  },
  inputs: {
    zendeskConnection: connectionInput,
    categoryName: {
      ...categoryName,
      required: false,
    },
    categoryDescription: {
      ...categoryDescription,
      required: false,
    },
    locale,
    position: {
      ...position,
      comments: "The position of the category to be created.",
    },
  },
  examplePayload: { data: createCategoryPayload },
});
