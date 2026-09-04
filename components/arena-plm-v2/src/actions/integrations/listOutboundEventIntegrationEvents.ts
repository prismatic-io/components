import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listOutboundEventIntegrationEventsExamplePayload } from "../../examplePayloads";
import { listOutboundEventIntegrationEventsInputs } from "../../inputs";
import { listOutboundEventIntegrationEventsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listOutboundEventIntegrationEvents = action({
  display: {
    label: "List Outbound Event Integration Events",
    description: "List all events for a specific outbound event integration.",
  },
  inputs: listOutboundEventIntegrationEventsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOutboundEventIntegrationEventsOutputSchema,
  }),
  examplePayload: listOutboundEventIntegrationEventsExamplePayload,
  perform: async (
    context,
    {
      connection,
      integrationGuid,
      resourcesReconciled,
      pagination,
      order,
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = {
        resourcesReconciled,
        offset: pagination?.offset,
        limit: pagination?.limit,
        order,
      };
      const endpoint = `/outboundevents/${integrationGuid}/events`;
      const events = await fetchArenaList(client, endpoint, params, fetchAll);
      context.logger.info("Retrieved outbound event integration events", {
        integrationGuid,
        count: events.count || 0,
      });
      return { data: events };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Outbound Event Integration Events",
      );
    }
  },
});
