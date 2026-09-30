import { action, outputSchema } from "@prismatic-io/spectral";
import { contentPropertySchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { createContentPropertyForPageInputs } from "../../inputs";
import { createContentPropertyExamplePayload as createContentPropertyForPageExamplePayload } from "../../examplePayloads";
export const createContentPropertyForPage = action({
  display: {
    label: "Create Content Property for Page",
    description: "Creates a new content property for a page.",
  },
  inputs: createContentPropertyForPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: contentPropertySchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, pageId, bodyData }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/pages/${pageId}/properties`,
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
    data: createContentPropertyForPageExamplePayload,
  }),
  examplePayload: {
    data: createContentPropertyForPageExamplePayload,
  },
});
