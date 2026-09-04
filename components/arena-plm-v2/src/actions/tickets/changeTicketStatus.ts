import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeTicketStatusExamplePayload } from "../../examplePayloads";
import { changeTicketStatusInputs } from "../../inputs";
import { ticketSchema } from "../../outputSchemas";
import type { TicketTransitionCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const changeTicketStatus = action({
  display: {
    label: "Change Ticket Status",
    description: "Change the status of a ticket in Arena PLM system.",
  },
  inputs: changeTicketStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketSchema,
  }),
  examplePayload: changeTicketStatusExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: TicketTransitionCreateVo = {
        ticket: { guid: params.ticketGuid },
        status: params.status,
      };
      const { data } = await client.post(
        "/tickets/statuschanges",
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Change Ticket Status");
    }
  },
});
