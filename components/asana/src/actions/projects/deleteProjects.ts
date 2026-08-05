import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteProjectsExamplePayload } from "../../examplePayloads";
import { deleteProjectsInputs } from "../../inputs";
export const deleteProjects = action({
  display: {
    label: "Delete Project",
    description: "Delete an existing project by ID.",
  },
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
});
