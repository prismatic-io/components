import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  meetingId,
  ocurrenceId,
  showPreviousOccurrences,
} from "../../inputs";
import { getMeetingExamplePayload } from "../../examplePayloads";

export const getMeeting = action({
  display: {
    label: "Get Meeting",
    description: "Get the information and metadata of a meeting by Id",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, meetingId, ocurrenceId, showPreviousOccurrences },
  ) => {
    const client = createZoomClient({ connection, debug });

    const { data } = await client.get(`/meetings/${meetingId}`, {
      params: {
        occurrence_id: ocurrenceId,
        show_previous_occurrences: showPreviousOccurrences,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    meetingId,
    ocurrenceId,
    showPreviousOccurrences,
  },
  examplePayload: getMeetingExamplePayload,
});
