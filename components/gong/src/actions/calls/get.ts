import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { callId, connection } from "../../inputs";

export const getCallUsingGet = action({
  display: {
    label: "Get Call",
    description: "Retrieve data for a specific call (/v2/calls/[id])",
  },
  perform: async (context, { connection, callId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/calls/${callId}`);
    return { data };
  },
  inputs: {
    connection,
    callId,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      call: {
        id: "7782342274025937895",
        url: "https://app.gong.io/call?id=7782342274025937895",
        title: "Example call",
        scheduled: 1518863400,
        started: 1518863400,
        duration: 460,
        primaryUserId: "234599484848423",
        direction: "Inbound",
        system: "Outreach",
        scope: "Internal",
        media: "Video",
        language: "eng",
        workspaceId: "623457276584334",
        sdrDisposition: "Got the gatekeeper",
        clientUniqueId: "7JEHFRGXDDZFEW2FC4U",
        customData: "Conference Call",
        purpose: "Demo Call",
        meetingUrl: "https://zoom.us/j/123",
        isPrivate: false,
        calendarEventId: "abcde@google.com",
      },
    },
  },
});
