import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { moveTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { moveTicketInputs as inputs } from "../../inputs";
import { ticketOutputSchema } from "../../outputSchemas";
export const moveTicket = action({
  display: {
    label: "Move Ticket",
    description: "Moves a ticket to a different workspace.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, ticketId, workspaceId, groupId, responderId },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      workspace_id: workspaceId,
      group_id: groupId,
      responder_id: responderId,
    };
    const { data } = await client.put(
      `/tickets/${ticketId}/move_workspace`,
      payload,
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketOutputSchema,
  }),
  inputs,
  examplePayload,
});
