import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getGroupExamplePayload } from "../../examplePayloads";
import { getGroupInputs } from "../../inputs/groups/get";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieve a single group.",
  },
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/groups/${groupId}`);

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getGroupInputs,
  },
  examplePayload: getGroupExamplePayload,
});
