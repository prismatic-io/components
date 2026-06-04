import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listMessagesInputs as inputs } from "../../inputs/ticketMessages";
import type { ListMessagesResponse } from "../../interfaces/ticketMessages";
import { listMessagesExamplePayload as examplePayload } from "../../examplePayloads/ticketMessages";
import { fetchAllWithPagination } from "../../utils/fetchAllWithPagination";

export const listMessages = action({
  display: {
    label: "List Messages",
    description: "List messages matching the given parameters.",
  },
  perform: async (context, { connection, fetchAll, ...configVars }) => {
    const client = createClient({
      connection,
      debug: context.debug.enabled,
    });
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
