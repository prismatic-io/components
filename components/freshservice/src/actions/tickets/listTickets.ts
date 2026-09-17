import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listTicketsExamplePayload as examplePayload } from "../../examplePayloads";
import { listTicketsInputs as inputs } from "../../inputs";
import { listTicketsOutputSchema } from "../../outputSchemas";
import { getListData } from "../../util";
export const listTickets = action({
  display: {
    label: "List Tickets",
    description: "Returns a list of all tickets.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, filter, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await getListData(client, `/tickets`, "tickets", {
      fetchAll,
      params: {
        ...additionalQueryParams,
        per_page: pagination.perPage,
        page: pagination.page,
        filter,
      },
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTicketsOutputSchema,
  }),
  inputs,
  examplePayload,
});
