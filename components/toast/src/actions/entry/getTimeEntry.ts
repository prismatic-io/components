import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { getTimeEntryExamplePayload as examplePayload } from "../../examplePayloads";
import { getTimeEntryInputs as inputs } from "../../inputs/entry";

export const getTimeEntry = action({
  display: {
    label: "Get Time Entry",
    description:
      "Returns a TimeEntry object containing information about one employee shift.",
  },
  perform: async (
    context,
    {
      connection,
      restaurantExternalId,
      timeEntryId,
      includeArchived,
      includeMissedBreaks,
    },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const { data } = await client.get(`/labor/v1/timeEntries/${timeEntryId}`, {
      params: {
        includeArchived,
        includeMissedBreaks,
      },
    });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
