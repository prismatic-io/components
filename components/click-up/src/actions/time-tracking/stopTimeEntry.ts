import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { stopTimeEntryExamplePayload } from "../../examplePayloads";
import { stopTimeEntryInputs } from "../../inputs";
import { stopTimeEntryOutputSchema } from "../../outputSchemas";
export const stopTimeEntry = action({
  display: {
    label: "Stop Time Entry",
    description:
      "Stop the timer that is currently running for the authenticated user.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: stopTimeEntryOutputSchema,
  }),
  examplePayload: stopTimeEntryExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/team/${teamId}/time_entries/stop`);
    return {
      data,
    };
  },
  examplePerform: async () => stopTimeEntryExamplePayload,
  inputs: stopTimeEntryInputs,
});
