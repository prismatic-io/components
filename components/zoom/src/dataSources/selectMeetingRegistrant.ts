import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectMeetingRegistrantInputs } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { Registrant } from "../interfaces/Registrant";

export const selectMeetingRegistrant = dataSource({
  display: {
    label: "Select Meeting Registrant",
    description: "A Picklist of registrants for a Zoom meeting.",
  },
  dataSourceType: "picklist",
  inputs: selectMeetingRegistrantInputs,
  perform: async (_context, { connection, meetingId }) => {
    const client = createZoomClient({ connection });
    const data: { registrants: Registrant[] } =
      await getAllPaginationResults<Registrant>(
        client,
        `/meetings/${meetingId}/registrants`,
        "registrants",
      );

    const result = data.registrants.map(
      ({ id, email, first_name, last_name }): Element => {
        const fullName = `${first_name} ${last_name}`.trim() || email;
        return {
          label: fullName,
          key: id,
        };
      },
    );

    return {
      result,
    };
  },
});
