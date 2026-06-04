import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteProjectInputs } from "../../inputs";
import { deleteProjectExamplePayload } from "../../examplePayloads";

export const deleteProject = action({
  display: {
    label: "Delete Project",
    description: "Permanently deletes a project from a Domo instance.",
  },
  examplePayload: deleteProjectExamplePayload,
  perform: async (context, { connection, projectId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/projects/${projectId}`);
    return { data };
  },
  inputs: deleteProjectInputs,
});

export default { deleteProject };
