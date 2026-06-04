import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createGroupInputs } from "../../inputs/groups/create";
import { getGroupExamplePayload as createGroupExamplePayload } from "../../examplePayloads";

export const createGroup = action({
  display: {
    label: "Create Group",
    description: "Create a group.",
  },
  perform: async (
    context,
    {
      connection,
      assignedLabels,
      description,
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      visibility,
      bodyFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/groups", {
      assignedLabels,
      description,
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      visibility,
      ...bodyFields,
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createGroupInputs,
  },
  examplePayload: createGroupExamplePayload,
});
