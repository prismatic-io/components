import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  fetchAll,
  filterId,
  paginationLimitInput,
  sortBy,
  sortDirection,
} from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import type { Organization } from "../../types/organization";
import { getOrganizationExamplePayload } from "../../examplePayloads/organizations";
import { WebhookVersion } from "../../constants";

export const getOrganizations = action({
  display: {
    label: "Get Organizations",
    description: "Gets all organizations.",
  },
  perform: async (
    context,
    { connection, filterId, limit, sortBy, sortDirection, fetchAll, cursor },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const data = await paginateRecordsWithCursor<Organization>(
      client,
      "organizations",
      {
        filter_id: filterId,
        limit,
        sort_by: sortBy,
        sort_direction: sortDirection,
        cursor,
      },
      fetchAll,
    );
    return { data };
  },
  inputs: {
    fetchAll,
    limit: paginationLimitInput,
    cursor,
    sortBy,
    sortDirection,
    filterId,
    connection: connectionInput,
  },
  examplePayload: {
    data: getOrganizationExamplePayload,
  },
});
