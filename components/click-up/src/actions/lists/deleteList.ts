import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteListExamplePayload } from "../../examplePayloads";
import { deleteListInputs } from "../../inputs";
export const deleteList = action({
  display: {
    label: "Delete List",
    description: "Delete a list from a workspace.",
  },
  examplePayload: deleteListExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, listId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/list/${listId}`);
    return {
      data,
    };
  },
  examplePerform: async () => deleteListExamplePayload,
  inputs: deleteListInputs,
});
