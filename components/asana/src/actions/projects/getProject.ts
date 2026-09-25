import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getProjectExamplePayload } from "../../examplePayloads";
import { getProjectInputs } from "../../inputs";
import { projectResponseSchema } from "../../outputSchemas";
export const getProject = action({
  display: {
    label: "Get Project",
    description: "Get the information and metadata of a project by ID.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/projects/${params.projectId}`, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: getProjectInputs,
  examplePayload: getProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: projectResponseSchema,
  }),
});
