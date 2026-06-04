import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  webinarId,
  occurrenceIdWebinarQuery,
  registrantStatus,
  trackingSourceId,
} from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { Registrant } from "../../interfaces/Registrant";
import { listWebinarRegistrantsExamplePayload } from "../../examplePayloads";

export const listWebinarRegistrants = action({
  display: {
    label: "List Webinar Registrants",
    description: "List all registrants of a given webinar.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      webinarId,
      occurrenceIdWebinarQuery,
      registrantStatus,
      trackingSourceId,
    },
  ) => {
    const client = createZoomClient({ connection, debug });

    const data: { registrants: Registrant[] } =
      await getAllPaginationResults<Registrant>(
        client,
        `/webinars/${webinarId}/registrants`,
        "registrants",
        {
          occurrence_id: occurrenceIdWebinarQuery,
          status: registrantStatus,
          tracking_source_id: trackingSourceId,
        },
      );
    return {
      data,
    };
  },
  inputs: {
    connection,
    webinarId,
    occurrenceIdWebinarQuery,
    registrantStatus,
    trackingSourceId,
  },
  examplePayload: listWebinarRegistrantsExamplePayload,
});
