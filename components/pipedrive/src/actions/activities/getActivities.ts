import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, sortBy, sortDirection } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const getActivities = action({
  display: {
    label: "Get Activities",
    description: "Gets all activities assigned to a particular user.",
  },
  perform: async (
    context,
    { connection, filterId, limit, updatedSince, updatedUntil, cursor, sortBy, sortDirection },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/activities", {
      params: {
        filter_id: filterId,
        limit,
        updated_since: updatedSince,
        updated_until: updatedUntil,
        cursor,
        sort_by: sortBy,
        sort_direction: sortDirection,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    filterId: input({
      label: "Filter ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments:
        'The ID of the filter to use (will narrow down results if used together with "user_id" parameter)',
      example: "123",
      placeholder: "Enter Filter ID",
    }),
    limit: paginationLimitInput,
    updatedSince: input({
      label: "Updated Since",
      type: "string",
      required: false,
      clean: cleanString,
      comments:
        "If set, only activities with an update_time later than or equal to this time are returned",
      example: "2024-01-01T10:00:00Z",
      placeholder: "Enter date (ISO 8601 format)",
    }),
    updatedUntil: input({
      label: "Updated Until",
      type: "string",
      required: false,
      clean: cleanString,
      comments:
        "If set, only activities with an update_time earlier than or equal to this time are returned",
      example: "2024-12-31T23:59:59Z",
      placeholder: "Enter date (ISO 8601 format)",
    }),
    sortBy,
    sortDirection: {
      ...sortDirection,
      default: "desc",
    },
    cursor,
  },
});
