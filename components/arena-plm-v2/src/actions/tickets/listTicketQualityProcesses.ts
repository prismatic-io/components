import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketQualityProcessesExamplePayload } from "../../examplePayloads";
import { listTicketQualityProcessesInputs } from "../../inputs";
import { referencedQualityListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listTicketQualityProcesses = action({
  display: {
    label: "List Ticket Quality Processes",
    description:
      "List all quality processes referenced by a specific ticket from Arena PLM system.",
  },
  inputs: listTicketQualityProcessesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: referencedQualityListSchema,
  }),
  examplePayload: listTicketQualityProcessesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/tickets/${params.ticketGuid}/quality`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Ticket Quality Processes");
    }
  },
});
