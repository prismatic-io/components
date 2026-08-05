import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProjectExamplePayload } from "../../examplePayloads";
import { getProjectInputs } from "../../inputs";
export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieve a project by ID",
  },
  inputs: getProjectInputs,
  perform: async (context, { connection, projectId }) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}`);
    return {
      data,
    };
  },
  examplePayload: getProjectExamplePayload,
});
