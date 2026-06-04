import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import { connection, meetingId, includeFields, ttl } from "../../inputs";
import { getMeetingRecordingsExamplePayload } from "../../examplePayloads";
import type { MeetingRecording } from "../../interfaces/MeetingRecording";

export const getMeetingRecordings = action({
  display: {
    label: "Get Meeting Recordings",
    description: "Get a list of all recordings of a meeting",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, meetingId, includeFields, ttl },
  ) => {
    const client = createZoomClient({ connection, debug });

    const { data } = await client.get<MeetingRecording>(
      `/meetings/${meetingId}/recordings`,
      {
        params: {
          include_fields: includeFields,
          ttl,
        },
      },
    );

    return {
      data,
    };
  },
  inputs: { connection, meetingId, includeFields, ttl },
  examplePayload: getMeetingRecordingsExamplePayload,
});
