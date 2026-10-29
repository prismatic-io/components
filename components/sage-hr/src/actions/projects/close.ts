import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { closeProjectExamplePayload } from "../../examplePayloads";
import { connectionInput, project_id } from "../../inputs";

export const closeProject = action({
  display: {
    label: "Close Project",
    description: "Close a project.",
  },
  inputs: {
    connectionInput,
    project_id: { ...project_id, comments: "ID of project to be closed" },
  },
  perform: async (context, { connectionInput, project_id }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/timesheets/projects/${project_id}/close`,
    );
    return {
      data,
    };
  },
  examplePayload: closeProjectExamplePayload,
});
