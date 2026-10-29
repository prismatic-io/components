import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import { connection, meetingId } from "../../inputs";
import { getMeetingInvitationExamplePayload } from "../../examplePayloads";

export const getMeetingInvitation = action({
  display: {
    label: "Get Meeting Invitation",
    description: "Get an invitation for a meeting",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, meetingId }) => {
    const client = createZoomClient({ connection, debug });
    const { data } = await client.get(`/meetings/${meetingId}/invitation`);

    return {
      data,
    };
  },
  inputs: { connection, meetingId },
  examplePayload: getMeetingInvitationExamplePayload,
});
