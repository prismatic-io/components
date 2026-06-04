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

export const getDealProducts = action({
  display: {
    label: "Get Deal Products",
    description: "Lists products attached to a deal.",
  },
  perform: async (context, { connection, id, limit, sortBy, sortDirection, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/deals/${id}/products`, {
      params: { limit, sort_by: sortBy, sort_direction: sortDirection, cursor },
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
