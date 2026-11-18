import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGroupExamplePayload as examplePayload } from "../../examplePayloads";
import { getGroupInputs as inputs } from "../../inputs/group";
import { getGroupOutputSchema } from "../../outputSchemas";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Read properties of a group object.",
  },
  performSafety: "safe",
  perform: async (context, { connection, groupId, $select }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = { $select };
    const { data } = await client.get(`/groups/${groupId}`, { params });
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getGroupOutputSchema,
  }),
  examplePayload,
});
