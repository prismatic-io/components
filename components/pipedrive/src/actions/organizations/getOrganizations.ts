import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationsInputs } from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import type { Organization } from "../../types/organization";
import { getOrganizationExamplePayload } from "../../examplePayloads";
import { WebhookVersion } from "../../constants";
import { getOrganizationsOutputSchema } from "../../outputSchemas";
export const getOrganizations = action({
  display: {
    label: "Get Organizations",
    description: "Gets all organizations.",
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
  inputs: getOrganizationsInputs,
  examplePayload: getOrganizationExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationsOutputSchema,
  }),
});
