import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGroupInputs } from "../../inputs/groups";
import { getGroupExamplePayload } from "../../examplePayloads/groups";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Returns a group by its ID.",
  },
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/groups/${groupId}`);

    return {
      data,
    };
  },
  inputs: getGroupInputs,
  examplePayload: getGroupExamplePayload,
});
