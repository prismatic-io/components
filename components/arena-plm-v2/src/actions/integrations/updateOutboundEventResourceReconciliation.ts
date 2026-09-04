import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateOutboundEventResourceReconciliationExamplePayload } from "../../examplePayloads";
import { updateOutboundEventResourceReconciliationInputs } from "../../inputs";
import { outboundEventResourceSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateOutboundEventResourceReconciliation = action({
  display: {
    label: "Update Outbound Event Resource Reconciliation",
    description: "Update the reconciliation status of a specific resource.",
  },
  inputs: updateOutboundEventResourceReconciliationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: outboundEventResourceSchema,
  }),
  examplePayload: updateOutboundEventResourceReconciliationExamplePayload,
  perform: async (
    context,
    {
      connection,
      integrationGuid,
      eventGuid,
      objectType,
      intUpdateGuid,
      reconcilePayload,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const response = await client.put(
        `/outboundevents/${integrationGuid}/events/${eventGuid}/${objectType}/${intUpdateGuid}`,
        { reconciled: reconcilePayload },
      );
      const updatedResource = response.data;
      context.logger.info(
        "Updated outbound event resource reconciliation status",
        {
          integrationGuid,
          eventGuid,
          objectType,
          intUpdateGuid,
        },
      );
      return { data: updatedResource };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Update Outbound Event Resource Reconciliation",
      );
    }
  },
});
