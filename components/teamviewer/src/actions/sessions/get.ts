import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSessionsInputs } from "../../inputs/sessions";
import { getSessionExamplePayload } from "../../examplePayloads/sessions";

export const getSession = action({
  display: {
    label: "Get Session",
    description: "Returns a session by its ID.",
  },
  perform: async (context, { connection, sessionId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/sessions/${sessionId}`);

    return {
      data,
    };
  },
  inputs: getSessionsInputs,
  examplePayload: getSessionExamplePayload,
});
