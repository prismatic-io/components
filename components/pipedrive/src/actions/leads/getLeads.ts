import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  sortInput,
} from "../../inputs";
import { cleanNumber, cleanString } from "../../util";

export const getLeads = action({
  display: {
    label: "Get Leads",
    description: "Gets all leads.",
  },
  perform: async (
    context,
    { connection, limit, start, archivedStatus, ownerId, filterId, sort },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/leads", {
      params: {
        limit,
        start,
        archived_status: archivedStatus,
        owner_id: ownerId,
        filter_id: filterId,
        sort,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    limit: paginationLimitInput,
    start: paginationStartInput,
    archivedStatus: input({
      label: "Archived Status",
      type: "string",
      model: [
        { label: "Archived", value: "archived" },
        { label: "Not Archived", value: "not_archived" },
        { label: "All", value: "all" },
      ],
      clean: cleanString,
      comments: "Filtering based on the archived status of a lead",
    }),
    ownerId: input({
      label: "Owner ID",
      type: "string",
      example: "1",
      clean: cleanNumber,
      comments: "If supplied, only leads matching the given user will be returned",
    }),
    filterId: input({
      label: "Filter ID",
      type: "string",
      example: "1",
      clean: cleanNumber,
      comments: "The ID of the filter to use",
    }),
    sort: sortInput,
  },
});
