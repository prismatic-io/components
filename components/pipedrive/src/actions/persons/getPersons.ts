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
import type { Person } from "../../types/persons";
import { getPersonsExamplePayload } from "../../examplePayloads/persons";
import { WebhookVersion } from "../../constants";

export const getPersons = action({
  display: {
    label: "Get Persons",
    description: "Gets all persons.",
  },
  perform: async (
    context,
    { connection, filterId, limit, sortBy, sortDirection, fetchAll, cursor },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);

    const data = await paginateRecordsWithCursor<Person>(
      client,
      "persons",
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
    filterId,
    sortBy,
    sortDirection,
    connection: connectionInput,
  },
  examplePayload: {
    data: getPersonsExamplePayload,
  },
});
