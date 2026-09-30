import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { createContentPropertyForCustomContentInputs } from "../../inputs";
import { createContentPropertyExamplePayload as createContentPropertyForCustomContentExamplePayload } from "../../examplePayloads";
export const createContentPropertyForCustomContent = action({
  display: {
    label: "Create Content Property for Custom Content",
    description: "Creates a new content property for a Custom Content.",
  },
  inputs: createContentPropertyForCustomContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, customContentId, bodyData }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/custom-content/${customContentId}/properties`,
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
    data: createContentPropertyForCustomContentExamplePayload,
  }),
  examplePayload: {
    data: createContentPropertyForCustomContentExamplePayload,
  },
});
