import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listTimeEntriesExamplePayload as examplePayload } from "../../examplePayloads";
import { listTimeEntriesInputs as inputs } from "../../inputs/entry";
import { serializeRepeatedParam } from "../../utils";
export const listTimeEntries = action({
  display: {
    label: "List Time Entries",
    description:
      "Returns an array of Time Entry objects that contain information about employee shift events.",
  },
  perform: async (
    context,
    {
      connection,
      restaurantExternalId,
      businessDate,
      dateRange,
      includeArchived,
      includeMissedBreaks,
      modifiedDateRange,
      timeEntryIds,
    },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );
    const { startDate, endDate } = dateRange;
    const { modifiedStartDate, modifiedEndDate } = modifiedDateRange;
    const serializedTimeEntryIds = serializeRepeatedParam(
      timeEntryIds || [],
      "timeEntryIds",
    );
    const { data } = await client.get(
      `/labor/v1/timeEntries?${serializedTimeEntryIds}`,
      {
        params: {
          businessDate,
          endDate,
          modifiedEndDate,
          modifiedStartDate,
          startDate,
          includeMissedBreaks,
          includeArchived,
        },
      },
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
