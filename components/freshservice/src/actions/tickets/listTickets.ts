import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listTicketsExamplePayload as examplePayload } from "../../examplePayloads";
import { listTicketsInputs as inputs } from "../../inputs/tickets";
import { getListData } from "../../util";

export const listTickets = action({
  display: {
    label: "List Tickets",
    description: "Returns a list of all tickets.",
  },
  perform: async (
    context,
    { connection, filter, fetchAll, perPage, page, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const { data } = await getListData(
      client,
      `/tickets`,
      "tickets",
      fetchAll,
      {
        ...additionalQueryParams,
        per_page: perPage,
        page,
        filter,
      },
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
