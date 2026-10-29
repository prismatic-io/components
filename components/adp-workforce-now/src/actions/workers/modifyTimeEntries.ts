import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { modifyTimeEntriesExamplePayload } from "../../examplePayloads";
import { modifyTimeEntriesInputs } from "../../inputs";
import { modifyTimeEntriesOutputSchema } from "../../outputSchemas";

export const modifyTimeEntries = action({
  display: {
    label: "Modify Time Entries",
    description: "Modify time entries event instance",
  },
  inputs: modifyTimeEntriesInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, events }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.post(
      "/events/time/v2/time-entries.modify",
      {
        events,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    modifyTimeEntriesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: modifyTimeEntriesOutputSchema,
  }),
  examplePayload: modifyTimeEntriesExamplePayload,
});
