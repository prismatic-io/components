import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonsInputs } from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import type { Person } from "../../types/persons";
import { getPersonsExamplePayload } from "../../examplePayloads";
import { WebhookVersion } from "../../constants";
import { getPersonsOutputSchema } from "../../outputSchemas";
export const getPersons = action({
  display: {
    label: "Get Persons",
    description: "Gets all persons.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      filterId,
      pagination: { limit, cursor } = {},
      sortBy,
      sortDirection,
      fetchAll,
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
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
  inputs: getPersonsInputs,
  examplePayload: getPersonsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonsOutputSchema,
  }),
});
