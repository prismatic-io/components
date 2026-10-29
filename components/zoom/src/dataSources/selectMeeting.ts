import { dataSource, type Element } from "@prismatic-io/spectral";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { Meeting } from "../interfaces/Meeting";
import { selectMeetingInputs } from "../inputs";

export const selectMeeting = dataSource({
  display: {
    label: "Select Meeting",
    description: "A Picklist of Zoom meetings.",
  },
  dataSourceType: "picklist",
  inputs: selectMeetingInputs,
  perform: async (_context, { connection, userId }) => {
    const client = createZoomClient({ connection });
    const data: { meetings: Meeting[] } =
      await getAllPaginationResults<Meeting>(
        client,
        `/users/${userId}/meetings`,
        "meetings",
      );

    const result = data.meetings.map(({ id, topic }): Element => {
      return {
        label: topic,
        key: id.toString(),
      };
    });

    return {
      result,
    };
  },
});
