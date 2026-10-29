import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  meetingId,
  ocurrenceId,
  registrantStatus,
} from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { Registrant } from "../../interfaces/Registrant";
import { listMeetingRegistrantsExamplePayload } from "../../examplePayloads";

export const listMeetingRegistrants = action({
  display: {
    label: "List Meeting Registrants",
    description:
      "Get the information and metadata of all registrants to a meeting by Id",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, meetingId, ocurrenceId, status },
  ) => {
    const client = createZoomClient({ connection, debug });

    const data: { registrants: Registrant[] } =
      await getAllPaginationResults<Registrant>(
        client,
        `/meetings/${meetingId}/registrants`,
        "registrants",
        { occurence_id: ocurrenceId, status },
      );

    return {
      data,
    };
  },
  inputs: {
    connection,
    meetingId,
    ocurrenceId,
    status: registrantStatus,
  },
  examplePayload: listMeetingRegistrantsExamplePayload,
});
