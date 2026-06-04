import { dataSource } from "@prismatic-io/spectral";
import {
  connection,
  user,
  adminManaged,
  organization,
  userAvailabilitySchedule,
  active,
  sort,
  returnUuidOnly,
} from "../inputs";
import { getCalendlyClient } from "../client";
import { getEventTypes, extractUuidFromUri } from "../util";

export const eventTypes = dataSource({
  display: {
    label: "Select Event Type",
    description:
      "Select an Event Type associated with a specified User. Either organization or user are required.",
  },
  inputs: {
    connection,
    user: {
      ...user,
      comments:
        "View available personal, team, and organization event types associated with the user's URI.",
    },
    adminManaged,
    organization: {
      ...organization,
      comments:
        "View available personal, team, and organization event types associated with the organization's URI.",
    },
    userAvailabilitySchedule,
    active,
    sort: {
      ...sort,
      comments:
        "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: name. Sort direction is specified as: asc, desc.",
      default: "name:asc",
    },
    returnUuidOnly,
  },
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
