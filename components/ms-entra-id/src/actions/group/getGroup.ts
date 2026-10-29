import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { getGroupInputs as inputs } from "../../inputs/group";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Read properties of a group object.",
  },
  perform: async (context, { connection, groupId, $select }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = { $select };
    const { data } = await client.get(`/groups/${groupId}`, { params });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
