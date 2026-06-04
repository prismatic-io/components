import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { defaultListActionsInputs } from "../../inputs/general";
import { listSessionsExamplePayload } from "../../examplePayloads/sessions";

export const listSessions = action({
  display: {
    label: "List Sessions",
    description: "Returns a list of sessions.",
  },
  perform: async (context, { connection, queryParams }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/sessions`, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: defaultListActionsInputs,
  examplePayload: listSessionsExamplePayload,
});
