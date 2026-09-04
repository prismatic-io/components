import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateEventItemReconciledExamplePayload } from "../../examplePayloads";
import { updateEventItemReconciledInputs } from "../../inputs";
import { eventItemSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateEventItemReconciled = action({
  display: {
    label: "Update Event Item Reconciled",
    description:
      "Updates the reconciliation status for a specific event Item with a GUID in an event with a given GUID from Arena PLM system. Requires integration administrator security.",
  },
  inputs: updateEventItemReconciledInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: eventItemSchema,
  }),
  examplePayload: updateEventItemReconciledExamplePayload,
  perform: async (
    context,
    { connection, integrationGuid, eventGuid, eventItemGuid, reconciled },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload = {
        reconciled: reconciled,
      };
      const { data } = await client.put(
        `/outboundintegrations/${integrationGuid}/events/${eventGuid}/items/${eventItemGuid}`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Event Item Reconciled");
    }
  },
});
