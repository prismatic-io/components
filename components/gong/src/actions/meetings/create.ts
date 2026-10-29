import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  endTime,
  externalId,
  invitees,
  organizerEmail,
  startTime,
  title,
} from "../../inputs";

export const createNewGongMeeting = action({
  display: {
    label: "Create New Gong Meeting",
    description: "Creates a new Gong Meeting",
  },
  perform: async (context, { connection, ...params }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/meetings`, params);
    return { data };
  },
  inputs: {
    connection,
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
