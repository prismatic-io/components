import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { createGroupInputs as inputs } from "../../inputs/group";
import { createGroupOutputSchema } from "../../outputSchemas";

export const createGroup = action({
  display: {
    label: "Create Group",
    description:
      "Create a new group. It can be a Microsoft 365 group, dynamic group, or security group.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { displayName, mailEnabled, mailNickname, securityEnabled },
  ) => ({
    data: {
      ...examplePayload.data,
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
    },
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createGroupOutputSchema,
  }),
  examplePayload,
});
