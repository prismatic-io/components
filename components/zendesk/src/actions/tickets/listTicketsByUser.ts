import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { listTicketsByUserExamplePayload } from "../../examplePayloads";
import { listTicketsByUserInputs } from "../../inputs";
import { listTicketsByUserOutputSchema } from "../../outputSchemas";
export const listTicketsByUser = action({
  display: {
    label: "List Tickets Requested By User",
    description:
      "List all of the tickets that a particular user has requested.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const result = await client.tickets.listByUserRequested(params.userId);
    return {
      data: result,
    };
  },
  examplePerform: async () => listTicketsByUserExamplePayload,
  inputs: listTicketsByUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketsByUserOutputSchema,
  }),
  examplePayload: listTicketsByUserExamplePayload,
});
