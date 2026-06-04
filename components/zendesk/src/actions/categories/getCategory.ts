import { action } from "@prismatic-io/spectral";
import { categoryId, connectionInput, locale } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Category } from "../../types";
import { getCategoryPayload } from "../../examplePayloads";

export const getCategory = action({
  display: {
    label: "Get Category",
    description: "Get a category from the Help Center.",
  },
  perform: async (context, { zendeskConnection, categoryId, locale }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{ category: Category }>(
      `/help_center/${locale}/categories/${categoryId}`,
    );

    return { data };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    categoryId,
  },
  examplePayload: {
    data: getCategoryPayload,
  },
});
