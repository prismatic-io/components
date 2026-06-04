import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  from,
  timezoneQuery,
  to,
  typeOfMeeting,
  userId,
} from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { Meeting } from "../../interfaces/Meeting";
import { listMeetingsExamplePayload } from "../../examplePayloads";

export const listMeetings = action({
  display: {
    label: "List Meetings",
    description: "List all meetings by user Id",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, userId, typeOfMeeting, from, to, timezoneQuery },
  ) => {
    const client = createZoomClient({ connection, debug });

    const data: { meetings: Meeting[] } =
      await getAllPaginationResults<Meeting>(
        client,
        `/users/${userId}/meetings`,
        "meetings",
        { type: typeOfMeeting, from, to, timezone: timezoneQuery },
      );

    return {
      data,
    };
  },
  inputs: {
    connection,
    userId,
    typeOfMeeting,
    from,
    to,
    timezoneQuery,
  },
  examplePayload: listMeetingsExamplePayload,
});
