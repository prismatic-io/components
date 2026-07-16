import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listMessagesExamplePayload as examplePayload } from "../../examplePayloads/ticketMessages";
import { listMessagesInputs as inputs } from "../../inputs/ticketMessages";
import type { ListMessagesResponse } from "../../interfaces/ticketMessages";
import { fetchAllWithPagination } from "../../utils/fetchAllWithPagination";
export const listMessages = action({
  display: {
    label: "List Messages",
    description: "List messages matching the given parameters.",
  },
  perform: async (context, { connection, fetchAll, pagination, ...rest }) => {
    const client = createClient({
      connection,
      debug: context.debug.enabled,
    });
    const configVars = { ...rest, ...pagination };
    const { data } = fetchAll
      ? await fetchAllWithPagination<ListMessagesResponse>({
          client,
          configVars,
          endpoint: "/messages",
        })
      : await client.get<ListMessagesResponse>("/messages", {
          params: configVars,
        });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
