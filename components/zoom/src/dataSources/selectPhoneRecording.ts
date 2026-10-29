import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectPhoneRecordingInputs } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { Recording } from "../interfaces/Recording";

export const selectPhoneRecording = dataSource({
  display: {
    label: "Select Phone Recording",
    description: "A Picklist of phone call recordings download URLs.",
  },
  dataSourceType: "picklist",
  inputs: selectPhoneRecordingInputs,
  perform: async (_context, { connection, userId, returnId }) => {
    const client = createZoomClient({ connection });
    const data: { recordings: Recording[] } =
      await getAllPaginationResults<Recording>(
        client,
        `/phone/users/${userId}/recordings`,
        "recordings",
      );

    const result = data.recordings.map(
      ({ id, caller_name, callee_name, download_url }): Element => {
        return {
          label: `Callee: ${callee_name} - Caller: ${caller_name}`,
          key: returnId ? id : download_url,
        };
      },
    );

    return {
      result,
    };
  },
});
