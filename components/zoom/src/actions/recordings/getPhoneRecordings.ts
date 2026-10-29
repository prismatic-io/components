import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import { connection, userId, from, to } from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { Recording } from "../../interfaces/Recording";
import { getPhoneRecordingsExamplePayload } from "../../examplePayloads";

export const getPhoneRecordings = action({
  display: {
    label: "Get Phone Recordings",
    description: "List all of the given users call recordings",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, userId, from, to },
  ) => {
    const client = createZoomClient({ connection, debug });

    const data: { recordings: Recording[] } =
      await getAllPaginationResults<Recording>(
        client,
        `/phone/users/${userId}/recordings`,
        "recordings",
        {
          from,
          to,
        },
      );

    return {
      data,
    };
  },
  inputs: {
    connection,
    userId,
    from: {
      ...from,
      comments:
        "The date range defined by the 'From' and 'To' inputs should be a month as the response only includes one month's worth of data at once. The month defined should fall within the last six months. If unspecified, returns data from the past 30 days.",
    },
    to: {
      ...to,
      comments: "Required only when the 'From' input is provided.",
    },
  },
  examplePayload: getPhoneRecordingsExamplePayload,
});
