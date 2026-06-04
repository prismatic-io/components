import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listProjectsInputs } from "../../inputs";
import { listProjectsExamplePayload } from "../../examplePayloads";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieves a list of all accessible projects.",
  },
  examplePayload: listProjectsExamplePayload,
  perform: async (context, { connection }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/projects`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: listProjectsInputs,
});

export default { listProjects };
