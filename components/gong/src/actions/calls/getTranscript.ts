import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  callIds,
  connection,
  cursor,
  fromDateTime,
  toDateTime,
  workspaceId,
} from "../../inputs";

export const getCallTranscript = action({
  display: {
    label: "Get Call Transcript",
    description:
      "Returns transcripts for calls that took place during the specified date period.",
  },
  perform: async (
    context,
    { connection, cursor, fromDateTime, toDateTime, workspaceId, callIds },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/calls/transcript`, {
      cursor,
      filter: {
        fromDateTime,
        toDateTime,
        workspaceId,
        callIds,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    cursor,
    fromDateTime: { ...fromDateTime, required: false },
    toDateTime: { ...toDateTime, required: false },
    workspaceId,
    callIds,
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
      callTranscripts: [
        {
          callId: "7782342274025937895",
          transcript: [
            {
              speakerId: "6432345678555530067",
              topic: "Objections",
              sentences: [
                {
                  start: 460230,
                  end: 462343,
                  text: "No wait, I think we should check that out first.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
});
