import { dataSource, type Element } from "@prismatic-io/spectral";
import { listAllCalendars } from "../helpers/listAllCalendars";
import { selectCalendarInputs } from "../inputs";

export const selectCalendar = dataSource({
  display: {
    label: "Select Calendar",
    description: "A list of selectable calendars",
  },
  inputs: selectCalendarInputs,
  perform: async (_context, { connection }) => {
    const { data: calendarList } = await listAllCalendars({
      connection,
      fetchAll: true,
    });
    const pickListOptions: Element[] = calendarList.items.map((calendar) => ({
      key: calendar.id,
      label: calendar.summary,
    }));

    pickListOptions.sort((a, b) => a.label.localeCompare(b.label));

    return { result: pickListOptions };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Holidays in United States",
        key: "en.usa#holiday@group.v.calendar.google.com",
      },
    ],
  },
});
