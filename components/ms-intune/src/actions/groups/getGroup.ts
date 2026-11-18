import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getGroupExamplePayload } from "../../examplePayloads";
import { getGroupInputs } from "../../inputs";
import { getGroupOutputSchema } from "../../outputSchemas";

export const getGroup = action({
  display: {
    label: "Get Group",
    description: "Retrieve a single group.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getGroupOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`${ENDPOINTS.GROUPS}/${groupId}`);

    return {
      data,
    };
  },
  inputs: getGroupInputs,
  examplePayload: getGroupExamplePayload,
});
