import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getGroupInputs } from "../../inputs";
import { getGroupExamplePayload } from "../../examplePayloads";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieves the details of an existing group.",
  },
  examplePayload: getGroupExamplePayload,
  perform: async (context, { connection, groupId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/groups/${groupId}`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: getGroupInputs,
});

export default { getGroup };
