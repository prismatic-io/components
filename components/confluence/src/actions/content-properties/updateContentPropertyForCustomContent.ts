import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { updateContentPropertyForCustomContentInputs } from "../../inputs";
import { getContentPropertyExamplePayload as updateContentPropertyForCustomContentExamplePayload } from "../../examplePayloads";
export const updateContentPropertyForCustomContent = action({
  display: {
    label: "Update Content Property for Custom Content",
    description: "Update a content property for a Custom Content by its id.",
  },
  inputs: updateContentPropertyForCustomContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, customContentId, bodyData, propertyId },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(
      `/custom-content/${customContentId}/properties/${propertyId}`,
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
    data: updateContentPropertyForCustomContentExamplePayload,
  }),
  examplePayload: {
    data: updateContentPropertyForCustomContentExamplePayload,
  },
});
