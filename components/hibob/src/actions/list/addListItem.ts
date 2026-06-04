import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { addListItemExamplePayload } from "../../examplePayloads";
import { addListItemInputs } from "../../inputs";

export const addListItem = action({
  display: {
    label: "Add List Item",
    description: "Adds a new item to an existing company list.",
  },
  perform: async (context, { connection, listName, itemName, parentId }) => {
    const client = getClient(connection, context.debug.enabled);

    const itemData = {
      name: itemName,
      parentId,
    };

    const { data } = await client.post(
      `/company/named-lists/${listName}`,
      itemData,
    );
    return {
      data,
    };
  },
  inputs: addListItemInputs,
  examplePayload: addListItemExamplePayload,
});
