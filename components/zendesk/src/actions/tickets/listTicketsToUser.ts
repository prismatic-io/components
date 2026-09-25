import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { listTicketsToUserExamplePayload } from "../../examplePayloads";
import { listTicketsToUserInputs } from "../../inputs";
import { listTicketsToUserOutputSchema } from "../../outputSchemas";
export const listTicketsToUser = action({
  display: {
    label: "List Tickets Assigned To User",
    description:
      "List all of the tickets that have been assigned to a particular user.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const result = await client.tickets.listAssigned(params.userId);
    return {
      data: result,
    };
  },
  examplePerform: async () => listTicketsToUserExamplePayload,
  inputs: listTicketsToUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketsToUserOutputSchema,
  }),
  examplePayload: listTicketsToUserExamplePayload,
});
