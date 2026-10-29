import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { listProjectListsExamplePayload } from "../../examplePayloads";
import { listProjectListsInputs } from "../../inputs";

export const listProjectLists = action({
  display: {
    label: "List Project Lists",
    description: "Retrieves all lists available within a given project.",
  },
  examplePayload: listProjectListsExamplePayload,
  perform: async (context, { connection, projectId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/projects/${projectId}/lists`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: listProjectListsInputs,
});

export default { listProjectLists };
