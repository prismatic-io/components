import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listOutboundEventIntegrationAdministratorsExamplePayload } from "../../examplePayloads";
import { listOutboundEventIntegrationAdministratorsInputs } from "../../inputs";
import { userCompactListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listOutboundEventIntegrationAdministrators = action({
  display: {
    label: "List Outbound Event Integration Administrators",
    description:
      "List administrators of a specific outbound event integration.",
  },
  inputs: listOutboundEventIntegrationAdministratorsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: userCompactListSchema,
  }),
  examplePayload: listOutboundEventIntegrationAdministratorsExamplePayload,
  perform: async (context, { connection, integrationGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const response = await client.get(
        `/outboundevents/${integrationGuid}/administrators`,
      );
      const administrators = response.data;
      context.logger.info(
        "Retrieved outbound event integration administrators",
        {
          integrationGuid,
          count: administrators.count || 0,
        },
      );
      return { data: administrators };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Outbound Event Integration Administrators",
      );
    }
  },
});
