import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listOutboundEventIntegrationTriggersExamplePayload } from "../../examplePayloads";
import { listOutboundEventIntegrationTriggersInputs } from "../../inputs";
import { listOutboundEventIntegrationTriggersOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listOutboundEventIntegrationTriggers = action({
  display: {
    label: "List Outbound Event Integration Triggers",
    description: "List all triggers for a specific outbound event integration.",
  },
  inputs: listOutboundEventIntegrationTriggersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOutboundEventIntegrationTriggersOutputSchema,
  }),
  examplePayload: listOutboundEventIntegrationTriggersExamplePayload,
  perform: async (context, { connection, integrationGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const response = await client.get(
        `/outboundevents/${integrationGuid}/triggers`,
      );
      const triggers = response.data;
      context.logger.info("Retrieved outbound event integration triggers", {
        integrationGuid,
        count: triggers.count || 0,
      });
      return { data: triggers };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Outbound Event Integration Triggers",
      );
    }
  },
});
