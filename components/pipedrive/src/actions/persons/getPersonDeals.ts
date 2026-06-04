import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  paginationLimitInput,
  personIdInput,
  sortBy,
  sortDirection,
} from "../../inputs";
import { cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const getPersonDeals = action({
  display: {
    label: "Get Person Deals",
    description: "Lists deals associated with a person.",
  },
  perform: async (context, { connection, id, limit, status, sortBy, sortDirection, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/deals", {
      params: {
        limit,
        status,
        sort_by: sortBy,
        sort_direction: sortDirection,
        person_id: id,
        cursor,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    limit: paginationLimitInput,
    cursor,
    status: input({
      label: "Status",
      type: "string",
      model: [
        { label: "Open", value: "open" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
        { label: "Deleted", value: "deleted" },
      ],
      clean: cleanString,
      comments: "Only fetch deals with a specific status",
    }),
    sortBy,
    sortDirection,
  },
});
