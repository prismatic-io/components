import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteListExamplePayload } from "../../examplePayloads";
import { connectionInput, getlistId } from "../../inputs";

const listId = getlistId(true, "List ID");

export const deleteList = action({
  display: {
    label: "Delete List",
    description: "Delete a list from a workspace.",
  },
  examplePayload: deleteListExamplePayload,
  perform: async (context, { clickUpConnection, listId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/list/${listId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    listId,
  },
});
