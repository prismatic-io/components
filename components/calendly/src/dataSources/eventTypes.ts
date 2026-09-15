import { dataSource } from "@prismatic-io/spectral";
import { eventTypesInputs } from "../inputs";
import { getCalendlyClient } from "../client";
import { getEventTypes, extractUuidFromUri } from "../util";
export const eventTypes = dataSource({
  display: {
    label: "Select Event Type",
    description:
      "Select an Event Type associated with a specified User. Either organization or user are required.",
  },
  inputs: eventTypesInputs,
  perform: async (
    context,
    {
      connection,
      user,
      adminManaged,
      organization,
      userAvailabilitySchedule,
      active,
      sort,
      returnUuidOnly,
    },
  ) => {
    const client = getCalendlyClient(connection, false);
    const data = await getEventTypes(
      client,
      adminManaged,
      organization,
      user,
      userAvailabilitySchedule,
      active,
      sort,
    );
    return {
      result: data.map((eventType: { name: string; uri: string }) => ({
        key: returnUuidOnly ? extractUuidFromUri(eventType.uri) : eventType.uri,
        label: eventType.name,
      })),
    };
  },
  dataSourceType: "picklist",
});
