import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import {
  connection,
  adminManaged,
  organization,
  user,
  userAvailabilitySchedule,
  active,
  sort,
} from "../../inputs";
import { listUserEventTypesExamplePayload } from "../../examplePayloads";
import { getEventTypes } from "../../util";

export const listUserEventTypes = action({
  display: {
    label: "List User's Event Types",
    description: "Returns all Event Types associated with a specified User.",
  },
  perform: async (
    context,
    {
      connection,
      adminManaged,
      organization,
      user,
      userAvailabilitySchedule,
      active,
      sort,
    },
  ) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const data = await getEventTypes(
      client,
      adminManaged,
      organization,
      user,
      userAvailabilitySchedule,
      active,
      sort,
    );
    return { data };
  },
  inputs: {
    connection,
    adminManaged,
    userAvailabilitySchedule,
    active,
    organization: {
      ...organization,
      dataSource: "organizations",
      comments:
        "View available personal, team, and organization event types associated with the organization's URI.",
    },
    user: {
      ...user,
      comments:
        "View available personal, team, and organization event types associated with the user's URI.",
    },
    sort: {
      ...sort,
      comments:
        "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: name. Sort direction is specified as: asc, desc.",
      default: "name:asc",
    },
  },
  examplePayload: listUserEventTypesExamplePayload,
});
