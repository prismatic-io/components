import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listTicketsExamplePayload } from "../../examplePayloads";
import { listTicketsInputs } from "../../inputs";
import { listTicketsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listTickets = action({
  display: {
    label: "List Tickets",
    description:
      "Search for tickets using filters like number, title, or status from Arena PLM system.",
  },
  inputs: listTicketsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketsOutputSchema,
  }),
  examplePayload: listTicketsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        title: params.title,
        status: params.status,
        "template.guid": params.templateGuid,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      const data = await fetchArenaList(
        client,
        "/tickets",
        queryParams,
        params.fetchAll,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Tickets");
    }
  },
});
