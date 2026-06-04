import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { moveTicketExamplePayload as examplePayload } from "../../examplePayloads";
import { moveTicketInputs as inputs } from "../../inputs/tickets";

export const moveTicket = action({
  display: {
    label: "Move Ticket",
    description: "Moves a ticket to a different workspace.",
  },
  perform: async (
    context,
    { connection, ticketId, workspaceId, groupId, responderId },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

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
  inputs,
  examplePayload,
});
