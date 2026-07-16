import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTicketsExamplePayload as examplePayload } from "../../examplePayloads/tickets";
import { listTicketsInputs as inputs } from "../../inputs/tickets";
import type { ListTicketsResponse } from "../../interfaces/tickets";
import { fetchAllWithPagination } from "../../utils/fetchAllWithPagination";
export const listTickets = action({
  display: {
    label: "List Tickets",
    description:
      "List tickets, paginated and ordered by the attribute of the given view.",
  },
  perform: async (context, { connection, fetchAll, pagination, ...rest }) => {
    const client = createClient({
      connection,
      debug: context.debug.enabled,
    });
    const configVars = { ...rest, ...pagination };
    const { data } = fetchAll
      ? await fetchAllWithPagination<ListTicketsResponse>({
          client,
          configVars,
          endpoint: "/tickets",
        })
      : await client.get<ListTicketsResponse>("/tickets", {
          params: configVars,
          paramsSerializer: { indexes: null },
        });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
