import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectMeetingRecordingInputs } from "../inputs";
import { createZoomClient } from "../client";
import type { MeetingRecording } from "../interfaces/MeetingRecording";

export const selectMeetingRecording = dataSource({
  display: {
    label: "Select Meeting Recording",
    description: "A Picklist of recording download URLs for a Zoom meeting.",
  },
  dataSourceType: "picklist",
  inputs: selectMeetingRecordingInputs,
  perform: async (_context, { connection, meetingId, returnId }) => {
    const client = createZoomClient({ connection });
    const { data } = await client.get<MeetingRecording>(
      `/meetings/${meetingId}/recordings`,
    );
    const recordingFiles = data.recording_files || [];
    const audioFiles = data.participant_audio_files || [];

    const resultRecordingFiles = recordingFiles.map(
      ({ id, download_url }, index): Element => {
        return {
          label: `Recording File ${index + 1}`,
          key: returnId ? id : download_url,
        };
      },
    );

    const resultAudioFiles = audioFiles.map(
      ({ id, download_url, file_name }): Element => {
        return {
          label: `Audio File: ${file_name}`,
          key: returnId ? id : download_url,
        };
      },
    );

    return {
      result: [...resultRecordingFiles, ...resultAudioFiles],
    };
  },
});
