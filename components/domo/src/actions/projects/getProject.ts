import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getProjectInputs } from "../../inputs";
import { getProjectExamplePayload } from "../../examplePayloads";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieves the details of an existing project by ID.",
  },
  examplePayload: getProjectExamplePayload,
  perform: async (context, { connection, projectId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: getProjectInputs,
});

export default { getProject };
