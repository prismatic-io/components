import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { listTicketsExamplePayload } from "../../examplePayloads";
import { listTicketsInputs } from "../../inputs";
import { listTicketsOutputSchema } from "../../outputSchemas";
export const listTickets = action({
  display: {
    label: "List Tickets",
    description: "List all tickets.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const result = await client.tickets.list();
    return {
      data: result,
    };
  },
  examplePerform: async () => listTicketsExamplePayload,
  inputs: listTicketsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketsOutputSchema,
  }),
  examplePayload: listTicketsExamplePayload,
});
