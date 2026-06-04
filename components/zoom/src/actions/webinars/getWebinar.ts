import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  occurrenceIdWebinar,
  webinarId,
  showPreviousOccurrencesWebinar,
} from "../../inputs";
import { getWebinarExamplePayload } from "../../examplePayloads";

export const getWebinar = action({
  display: {
    label: "Get Webinar",
    description: "Get the information and metadata of a webinar by Id",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      webinarId,
      occurrenceIdWebinar,
      showPreviousOccurrencesWebinar,
    },
  ) => {
    const client = createZoomClient({ connection, debug });

    const { data } = await client.get(`/webinars/${webinarId}`, {
      params: {
        occurrence_id: occurrenceIdWebinar,
        show_previous_occurrences: showPreviousOccurrencesWebinar,
      },
    });
    return {
      data,
    };
  },
  inputs: {
    connection,
    webinarId,
    occurrenceIdWebinar,
    showPreviousOccurrencesWebinar,
  },
  examplePayload: getWebinarExamplePayload,
});
