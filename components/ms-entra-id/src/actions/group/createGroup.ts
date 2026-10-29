import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { createGroupInputs as inputs } from "../../inputs/group";

export const createGroup = action({
  display: {
    label: "Create Group",
    description:
      "Create a new group. It can be a Microsoft 365 group, dynamic group, or security group.",
  },
  perform: async (
    context,
    {
      connection,
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      groupTypes,
      additionalProperties,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      groupTypes,
      ...(additionalProperties || {}),
    };
    const { data } = await client.post("/groups", payload);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
