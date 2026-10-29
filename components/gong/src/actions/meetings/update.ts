import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  endTime,
  externalId,
  invitees,
  meetingId,
  organizerEmail,
  startTime,
  title,
} from "../../inputs";

export const updateGongMeeting = action({
  display: {
    label: "Update Gong Meeting",
    description: "Updates an existing Gong Meeting",
  },
  perform: async (context, { connection, meetingId, ...params }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/v2/meetings/${meetingId}`, params);
    return { data };
  },
  inputs: {
    connection,
    meetingId,
    startTime,
    endTime,
    organizerEmail,
    invitees,
    externalId,
    title,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      meetingId: "7782342274025937895",
      meetingUrl:
        "https://join.gong.io/my-company/jon.snow?tkn=MoNpS9tMNt8BK7EZxQpSJl",
      additionalInvitees: [
        {
          displayName: "Gong Assistant",
          email: "assistant@gong.io",
        },
      ],
    },
  },
});
