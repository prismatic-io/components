import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { updateSectionExamplePayload } from "../../examplePayloads";
import { updateSectionInputs } from "../../inputs";
import { sectionResponseSchema } from "../../outputSchemas";
export const updateSection = action({
  display: {
    label: "Update Section",
    description: "Update the information and metadata of a project section.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/sections/${params.sectionId}`,
      {
        data: {
          insert_after: params.insertAfter,
          insert_before: params.insertBefore,
          name: params.sectionName,
        },
      },
      { params: { opt_fields: params.optFields } },
    );
    return { data };
  },
  inputs: updateSectionInputs,
  examplePayload: updateSectionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sectionResponseSchema,
  }),
});
