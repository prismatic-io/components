import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { updateContentPropertyForPageInputs } from "../../inputs";
import { getContentPropertyExamplePayload as updateContentPropertyForPageExamplePayload } from "../../examplePayloads";
export const updateContentPropertyForPage = action({
  display: {
    label: "Update Content Property for Page",
    description: "Update a content property for a page by its id.",
  },
  inputs: updateContentPropertyForPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, pageId, bodyData, propertyId },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(
      `/pages/${pageId}/properties/${propertyId}`,
      bodyData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateContentPropertyForPageExamplePayload,
  }),
  examplePayload: {
    data: updateContentPropertyForPageExamplePayload,
  },
});
