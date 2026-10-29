import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { updateListItemExamplePayload } from "../../examplePayloads";
import { updateListItemInputs } from "../../inputs";

export const updateListItem = action({
  display: {
    label: "Update List Item",
    description: "Updates an existing item in a company list.",
  },
  perform: async (
    context,
    { connection, listName, itemId, itemName, parentId },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const itemData = {
      name: itemName,
      parentId,
    };

    await client.put(`/company/named-lists/${listName}/${itemId}`, itemData);
    return {
      data: {
        success: true,
        message: "List item updated successfully",
      },
    };
  },
  inputs: updateListItemInputs,
  examplePayload: updateListItemExamplePayload,
});
