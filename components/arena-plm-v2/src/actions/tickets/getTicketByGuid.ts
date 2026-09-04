import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getTicketByGuidExamplePayload } from "../../examplePayloads";
import { getTicketByGuidInputs } from "../../inputs";
import { ticketSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getTicketByGuid = action({
  display: {
    label: "Get Ticket by GUID",
    description:
      "Get details of a specific ticket by GUID from Arena PLM system.",
  },
  inputs: getTicketByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ticketSchema,
  }),
  examplePayload: getTicketByGuidExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(`/tickets/${params.ticketGuid}`);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Ticket by GUID");
    }
  },
});
