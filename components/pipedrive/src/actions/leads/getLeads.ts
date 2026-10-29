import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLeadsInputs } from "../../inputs";
import { getLeadsExamplePayload } from "../../examplePayloads";
import { getLeadsOutputSchema } from "../../outputSchemas";

export const getLeads = action({
  display: {
    label: "Get Leads",
    description: "Gets all leads.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      pagination: { limit, start } = {},
      archivedStatus,
      ownerId,
      filterId,
      sort,
    },
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
  inputs: getLeadsInputs,
  examplePayload: getLeadsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLeadsOutputSchema,
  }),
});
