import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { itemId, notes, connectionInput } from "../../inputs";
import { addNoteToItemExamplePayload } from "../../examplePayloads";

export const addNoteToItem = action({
  display: {
    label: "Add Note To Item",
    description: "Add a note to an item's history by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(`/items/${params.itemId}/history`, {
      HistoryRecords: [
        {
          Details: util.types.toString(params.notes),
        },
      ],
    });
    return { data };
  },
  inputs: { itemId, notes, xeroConnection: connectionInput },
  examplePayload: addNoteToItemExamplePayload,
});
