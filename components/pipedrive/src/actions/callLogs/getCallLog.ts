import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { callLogIdInput, connectionInput } from "../../inputs";

export const getCallLog = action({
  display: {
    label: "Get Call Log",
    description: "Gets details of a call log.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/callLogs/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: callLogIdInput,
  },
});
