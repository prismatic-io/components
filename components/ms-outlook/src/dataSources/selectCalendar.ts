import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { computeEndpointBasedOnConnection, fetchAllData } from "../util";
import type { Calendar } from "@microsoft/microsoft-graph-types";
import type { ODataAttrs } from "../types";
import { createClient } from "../client";
import { selectCalendarExamplePayload } from "../examplePayloads";
import { selectCalendarInputs } from "../inputs";

export const selectCalendar = dataSource({
  display: {
    label: "Select Calendar",
    description: "Select a calendar from the list of calendars.",
  },
  inputs: selectCalendarInputs,
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);
    const { value } = await fetchAllData<Calendar & ODataAttrs>(
      client,
      computeEndpointBasedOnConnection(connection, "/me/calendars"),
      true,
      {},
    );

    const result = value.map<Element>((calendar) => ({
      label: util.types.toString(calendar.name),
      key: util.types.toString(calendar.id),
    }));
    return { result };
  },
  examplePayload: selectCalendarExamplePayload,
  dataSourceType: "picklist",
});
