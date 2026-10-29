import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectWebinarRegistrantInputs } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { Registrant } from "../interfaces/Registrant";

export const selectWebinarRegistrant = dataSource({
  display: {
    label: "Select Webinar Registrant",
    description: "A Picklist of registrants for a Zoom webinar.",
  },
  dataSourceType: "picklist",
  inputs: selectWebinarRegistrantInputs,
  perform: async (_context, { connection, webinarId }) => {
    const client = createZoomClient({ connection });
    const data: { registrants: Registrant[] } =
      await getAllPaginationResults<Registrant>(
        client,
        `/webinars/${webinarId}/registrants`,
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
