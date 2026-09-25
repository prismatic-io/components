import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removeCustomFieldFromProjectExamplePayload } from "../../examplePayloads";
import { removeCustomFieldFromProjectInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const removeCustomFieldFromProject = action({
  display: {
    label: "Remove Custom Field from Project",
    description: "Remove an existing custom field from an existing project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/projects/${params.projectId}/removeCustomFieldSetting`,
      {
        data: {
          custom_field: params.fieldId,
        },
      },
    );
    return { data };
  },
  inputs: removeCustomFieldFromProjectInputs,
  examplePayload: removeCustomFieldFromProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
