import { dataSource, type Element } from "@prismatic-io/spectral";
import { createToastClient } from "../client";
import { selectTimeEntryInputs as inputs } from "../inputs/dataSources";

export const selectTimeEntry = dataSource({
  display: {
    label: "Select Time Entry",
    description:
      "Select a time entry from a list of employee shift time entries.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, restaurantExternalId, startDate, endDate },
  ) => {
    const client = await createToastClient(
      connection,
      false,
      restaurantExternalId,
    );

    if (!startDate || !endDate) {
      throw new Error(
        "Start Date and End Date inputs for Select Time Entry Data Source are required",
      );
    }

    const { data } = await client.get(`/labor/v1/timeEntries`, {
      params: {
        startDate,
        endDate,
      },
    });

    const objects = (
      data as { guid: string; inDate: string; outDate: string }[]
    )
      .map<Element>((entry) => ({
        key: entry.guid,
        label: `${new Date(entry.inDate).toLocaleString()} - ${new Date(entry.outDate).toLocaleString()}`,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result: objects };
  },
  examplePayload: {
    result: [
      {
        label: "1/1/2025, 8:00:00 AM - 1/1/2025, 4:00:00 PM",
        key: "12345678-1234-1234-1234-123456789012",
      },
    ],
  },
});
