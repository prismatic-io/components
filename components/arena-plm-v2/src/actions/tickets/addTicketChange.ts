import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addTicketChangeExamplePayload } from "../../examplePayloads";
import { addTicketChangeInputs } from "../../inputs";
import { requestChangeSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addTicketChange = action({
  display: {
    label: "Add Ticket Change",
    description: "Link a change to a ticket in Arena PLM system.",
  },
  inputs: addTicketChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestChangeSchema,
  }),
  examplePayload: addTicketChangeExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload = {
        change: { guid: params.changeGuid },
      };
      const { data } = await client.post(
        `/tickets/${params.ticketGuid}/changes`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Ticket Change");
    }
  },
});
