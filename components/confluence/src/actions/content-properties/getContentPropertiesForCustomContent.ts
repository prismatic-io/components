import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { getContentPropertiesForCustomContentInputs } from "../../inputs";
import { getContentPropertyExamplePayload as getContentPropertyForCustomContentExamplePayload } from "../../examplePayloads";
export const getContentPropertiesForCustomContent = action({
  display: {
    label: "Get Content Properties for Custom Content",
    description:
      "Retrieves a specific Content Property by ID that is attached to a specified custom content.",
  },
  inputs: getContentPropertiesForCustomContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connectionInput, customContentId, propertyId },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(
      `/custom-content/${customContentId}/properties/${propertyId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getContentPropertyForCustomContentExamplePayload,
  },
});
