import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { callLogIdInput, connectionInput } from "../../inputs";

export const deleteCallLog = action({
  display: {
    label: "Delete Call Log",
    description: "Deletes a call log.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/callLogs/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: callLogIdInput,
  },
});
