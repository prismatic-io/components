import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listIntegrationFiltersExamplePayload } from "../../examplePayloads";
import { listIntegrationFiltersInputs } from "../../inputs";
import { listIntegrationFiltersOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listIntegrationFilters = action({
  display: {
    label: "List Integration Filters",
    description:
      "Returns filter settings for a specific outbound integration from Arena PLM system.",
  },
  inputs: listIntegrationFiltersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIntegrationFiltersOutputSchema,
  }),
  examplePayload: listIntegrationFiltersExamplePayload,
  perform: async (context, { connection, integrationGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const { data } = await client.get(
        `/outboundintegrations/${integrationGuid}/filters`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Integration Filters");
    }
  },
});
