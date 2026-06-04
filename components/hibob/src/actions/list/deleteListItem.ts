import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { deleteListItemExamplePayload } from "../../examplePayloads";
import { deleteListItemInputs } from "../../inputs";

export const deleteListItem = action({
  display: {
    label: "Delete List Item",
    description: "Deletes an existing item from a company list.",
  },
  perform: async (context, { connection, listName, itemId }) => {
    const client = getClient(connection, context.debug.enabled);

    await client.delete(`/company/named-lists/${listName}/${itemId}`);
    return {
      data: {
        success: true,
        message: `List item ${itemId} deleted successfully`,
      },
    };
  },
  inputs: deleteListItemInputs,
  examplePayload: deleteListItemExamplePayload,
});
