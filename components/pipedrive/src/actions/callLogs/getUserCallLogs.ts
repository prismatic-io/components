import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, paginationLimitInput, paginationStartInput } from "../../inputs";

export const getUserCallLogs = action({
  display: {
    label: "Get User Call Logs",
    description: "Gets all call logs assigned to a particular user.",
  },
  perform: async (context, { connection, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/callLogs", {
      params: { start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
});
