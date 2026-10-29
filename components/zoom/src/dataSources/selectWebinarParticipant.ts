import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectWebinarParticipantInputs } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { Participant } from "../interfaces/Participant";

export const selectWebinarParticipant = dataSource({
  display: {
    label: "Select Webinar Participant",
    description: "A Picklist of participants for a past Zoom webinar.",
  },
  dataSourceType: "picklist",
  inputs: selectWebinarParticipantInputs,
  perform: async (_context, { connection, webinarId }) => {
    const client = createZoomClient({ connection });
    const data: { participants: Participant[] } =
      await getAllPaginationResults<Participant>(
        client,
        `/past_webinars/${webinarId}/participants`,
        "participants",
      );

    const result = data.participants.map(
      ({ id, name, user_email, user_id }): Element => {
        const label = name || user_email || id;
        return {
          label,
          key: id || user_id,
        };
      },
    );

    return {
      result,
    };
  },
});
