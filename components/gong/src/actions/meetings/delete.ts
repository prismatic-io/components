import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, meetingId } from "../../inputs";

export const deleteMeeting = action({
  display: {
    label: "Delete Gong Meeting",
    description: "Deletes an existing Gong Meeting",
  },
  perform: async (context, { connection, meetingId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/meetings/${meetingId}`);
    return { data };
  },
  inputs: {
    connection,
    meetingId,
  },
  examplePayload: {
    data: {
      organizerEmail: "test@test.com",
    },
  },
});
