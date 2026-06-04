import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateSessionInputs } from "../../inputs/sessions";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const updateSession = action({
  display: {
    label: "Update Session",
    description: "Updates a session by its ID.",
  },
  perform: async (
    context,
    {
      connection,
      sessionId,
      customBody,
      customId,
      description,
      groupid,
      groupname,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      ...customBody,
      customId,
      description,
      groupid,
      groupname,
    };

    await client.put(`/sessions/${sessionId}`, body);

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: updateSessionInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
