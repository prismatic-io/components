import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  dealIdInput,
  paginationLimitInput,
  sortBy,
  sortDirection,
} from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getDealPersons = action({
  display: {
    label: "Get Deal Persons (Deprecated)",
    description: "Lists all persons associated with a deal.",
  },
  perform: async (context, { connection, id, limit, sortBy, sortDirection, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/persons", {
      params: { limit, deal_id: id, sort_by: sortBy, sort_direction: sortDirection, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    limit: paginationLimitInput,
    cursor,
    sortBy: sortBy,
    sortDirection: sortDirection,
  },
});
