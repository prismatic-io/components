import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import { connection, webinarId } from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { Participant } from "../../interfaces/Participant";
import { listWebinarParticipantsExamplePayload } from "../../examplePayloads";

export const listWebinarParticipants = action({
  display: {
    label: "List Webinar Participants",
    description: "List all participants of a given webinar",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, webinarId }) => {
    const client = createZoomClient({ connection, debug });

    const data: { participants: Participant[] } =
      await getAllPaginationResults<Participant>(
        client,
        `/past_webinars/${webinarId}/participants`,
        "participants",
      );
    return {
      data,
    };
  },
  inputs: { connection, webinarId },
  examplePayload: listWebinarParticipantsExamplePayload,
});
