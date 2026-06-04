import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateProjectMembersInputs } from "../../inputs";
import { updateProjectMembersExamplePayload } from "../../examplePayloads";

export const updateProjectMembers = action({
  display: {
    label: "Update Project Members",
    description: "Updates the members of a given project.",
  },
  examplePayload: updateProjectMembersExamplePayload,
  perform: async (
    context,
    { connection, projectId, updateProjectMembersBody },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (updateProjectMembersBody.length)
      body = JSON.parse(updateProjectMembersBody);

    const { data } = await client.put(
      `/projects/${projectId}/members`,
      body,
      { headers: { "Content-Type": "application/json" } },
    );
    return { data };
  },
  inputs: updateProjectMembersInputs,
});

export default { updateProjectMembers };
