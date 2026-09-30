import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { getContentPropertiesForPageInputs } from "../../inputs";
import { getContentPropertyExamplePayload as getContentPropertyForPageExamplePayload } from "../../examplePayloads";
export const getContentPropertiesForPage = action({
  display: {
    label: "Get Content Property for Page",
    description:
      "Retrieves a specific Content Property by ID that is attached to a specified page.",
  },
  inputs: getContentPropertiesForPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "safe",
  perform: async (context, { connectionInput, pageId, propertyId }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/pages/${pageId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getContentPropertyForPageExamplePayload,
  },
});
