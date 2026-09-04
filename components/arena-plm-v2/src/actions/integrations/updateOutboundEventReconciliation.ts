import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateOutboundEventReconciliationExamplePayload } from "../../examplePayloads";
import { updateOutboundEventReconciliationInputs } from "../../inputs";
import { outboundEventShortSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateOutboundEventReconciliation = action({
  display: {
    label: "Update Outbound Event Reconciliation",
    description: "Update the reconciliation status of a specific event.",
  },
  inputs: updateOutboundEventReconciliationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: outboundEventShortSchema,
  }),
  examplePayload: updateOutboundEventReconciliationExamplePayload,
  perform: async (
    context,
    { connection, integrationGuid, eventGuid, reconcilePayload },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const response = await client.put(
        `/outboundevents/${integrationGuid}/events/${eventGuid}`,
        { resourcesReconciled: reconcilePayload },
      );
      const updatedEvent = response.data;
      context.logger.info("Updated outbound event reconciliation status", {
        integrationGuid,
        eventGuid,
      });
      return { data: updatedEvent };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Update Outbound Event Reconciliation",
      );
    }
  },
});
