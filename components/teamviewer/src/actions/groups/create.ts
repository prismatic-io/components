import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createGroupInputs } from "../../inputs/groups";
import { createGroupExamplePayload } from "../../examplePayloads/groups";

export const createGroup = action({
  display: {
    label: "Create Group",
    description: "Creates a new group.",
  },
  perform: async (context, { connection, name, policy_id }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      name,
      policy_id,
    };

    const { data } = await client.post(`/groups`, body);

    return {
      data,
    };
  },
  inputs: createGroupInputs,
  examplePayload: createGroupExamplePayload,
});
