import { action } from "@prismatic-io/spectral";
import { categoryId, connectionInput } from "../../inputs";
import { rawHttpClient } from "../../auth";

export const deleteCategory = action({
  display: {
    label: "Delete Category",
    description: "Delete a category in the Help Center.",
  },
  perform: async (context, { categoryId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);

    const { data } = await client.delete(
      `/help_center/categories/${categoryId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    categoryId,
  },
  examplePayload: {
    data: null,
  },
});
