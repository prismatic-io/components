import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectWebinarInputs } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { Webinar } from "../interfaces/Webinar";

export const selectWebinar = dataSource({
  display: {
    label: "Select Webinar",
    description: "A Picklist of Zoom webinars.",
  },
  dataSourceType: "picklist",
  inputs: selectWebinarInputs,
  perform: async (_context, { connection, userId }) => {
    const client = createZoomClient({ connection });
    const data: { webinars: Webinar[] } =
      await getAllPaginationResults<Webinar>(
        client,
        `/users/${userId}/webinars`,
        "webinars",
      );

    const result = data.webinars.map(({ id, topic }): Element => {
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
