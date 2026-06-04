import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { retrievePollStateResponse } from "../../examplePayloads";
import { connection, items } from "../../inputs";
import type { PollState } from "../../types";

export const retrievePollState = action({
  display: {
    label: "Retrieve Poll State",
    description: "Poll processing state of finalized files",
  },
  inputs: {
    items,
    connection,
  },
  perform: async (context, { connection, items }) => {
    const client = createClient(connection, context.debug.enabled);
    const keepExecuting = true;
    
    do {
      const { data } = await client.get<PollState>(`/upload/poll`, {
        params: {
          items,
        },
      });
      const values = items?.split(",").filter(Boolean) || [];
      const allItemsProcessed = values?.every(
        (value) =>
          data.itemsDone.includes(value) ||
          data.itemsRejected.includes(value) ||
          data.itemsFailed.includes(value),
      );
      if (allItemsProcessed || values.length === 0) {
        return { data };
      }
    } while (keepExecuting);
  },
  examplePayload: {
    data: retrievePollStateResponse,
  },
});
