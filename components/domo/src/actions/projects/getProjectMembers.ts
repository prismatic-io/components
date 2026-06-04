import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getProjectMembersInputs } from "../../inputs";
import { getProjectMembersExamplePayload } from "../../examplePayloads";

export const getProjectMembers = action({
  display: {
    label: "Get Project Members",
    description: "Retrieves the member user IDs for a given project.",
  },
  examplePayload: getProjectMembersExamplePayload,
  perform: async (context, { connection, projectId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}/members`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: getProjectMembersInputs,
});

export default { getProjectMembers };
