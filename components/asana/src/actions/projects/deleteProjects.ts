import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteProjectsExamplePayload } from "../../examplePayloads";
import { deleteProjectsInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const deleteProjects = action({
  display: {
    label: "Delete Project",
    description: "Delete an existing project by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/projects/${params.projectId}`);
    return { data };
  },
  inputs: deleteProjectsInputs,
  examplePayload: deleteProjectsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
