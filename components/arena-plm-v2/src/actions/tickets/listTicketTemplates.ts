import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketTemplatesExamplePayload } from "../../examplePayloads";
import { listTicketTemplatesInputs } from "../../inputs";
import { listTicketTemplatesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTicketTemplates = action({
  display: {
    label: "List Ticket Templates",
    description:
      "List all ticket templates from Arena PLM system with optional filtering.",
  },
  inputs: listTicketTemplatesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketTemplatesOutputSchema,
  }),
  examplePayload: listTicketTemplatesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = { name: params.name, active: params.active };
      const { data } = await client.get("/settings/tickets/templates", {
        params: queryParams,
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Ticket Templates");
    }
  },
});
