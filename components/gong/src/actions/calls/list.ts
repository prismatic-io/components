import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  cursor,
  fromDateTime,
  toDateTime,
  workspaceId,
} from "../../inputs";

export const listCallsUsingGet = action({
  display: {
    label: "List Calls",
    description: "Retrieve call data by date range (/v2/calls)",
  },
  perform: async (
    context,
    { connection, cursor, fromDateTime, toDateTime, workspaceId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/calls`, {
      params: { cursor, fromDateTime, toDateTime, workspaceId },
    });
    return { data };
  },
  inputs: {
    connection,
    cursor,
    fromDateTime,
    toDateTime,
    workspaceId,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      records: {
        totalRecords: 263,
        currentPageSize: 100,
        currentPageNumber: 0,
        cursor:
          "eyJhbGciOiJIUzI1NiJ9.eyJjYWxsSWQiM1M30.6qKwpOcvnuweTZmFRzYdtjs_YwJphJU4QIwWFM",
      },
      calls: [
        {
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
      ],
    },
  },
});
