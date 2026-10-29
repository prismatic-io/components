import { dataSource, type Element } from "@prismatic-io/spectral";
import { listAllEvents } from "../helpers/listAllEvents";
import { selectEventInputs } from "../inputs";

export const selectEvent = dataSource({
  display: {
    label: "Select Event",
    description: "A list of selectable events",
  },
  inputs: selectEventInputs,
  perform: async (_context, { connection: googleConnection, calendarId }) => {
    const result = await listAllEvents({
      googleConnection,
      calendarId,
      fetchAll: true,
    });
    const pickListOptions: Element[] = result.data.items.map((event) => ({
      key: event.id,
      label: `${event.summary} (${event.start.date} to ${event.end.date})`,
    }));

    pickListOptions.sort((a, b) => a.label.localeCompare(b.label));

    return { result: pickListOptions };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "New Year's Day (2020-01-01 to 2020-01-02)",
        key: "20200101_q8ue475rr4p7opsd4c0lr7g5pg",
      },
    ],
  },
});
