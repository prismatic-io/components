import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getListMembersExamplePayload } from "../../examplePayloads";
import { getListMembersInputs } from "../../inputs";
import { getListMembersOutputSchema } from "../../outputSchemas";
export const getListMembers = action({
  display: {
    label: "Get List Members",
    description: "List the people who have access to a list.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getListMembersOutputSchema,
  }),
  examplePayload: getListMembersExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, listId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/list/${listId}/member`);
    return {
      data,
    };
  },
  inputs: getListMembersInputs,
});
