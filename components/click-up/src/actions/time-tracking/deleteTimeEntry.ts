import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteTimeEntryExamplePayload } from "../../examplePayloads";
import { deleteTimeEntryInputs } from "../../inputs";
import { deleteTimeEntryOutputSchema } from "../../outputSchemas";
export const deleteTimeEntry = action({
  display: {
    label: "Delete Time Entry",
    description: "Delete a time entry from a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTimeEntryOutputSchema,
  }),
  examplePayload: deleteTimeEntryExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, teamId, timerId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/team/${teamId}/time_entries/${timerId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteTimeEntryExamplePayload,
  inputs: deleteTimeEntryInputs,
});
