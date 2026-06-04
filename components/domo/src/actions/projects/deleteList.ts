import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deleteListInputs } from "../../inputs";
import { deleteListExamplePayload } from "../../examplePayloads";

export const deleteList = action({
  display: {
    label: "Delete List",
    description: "Permanently deletes a list from a Domo instance.",
  },
  examplePayload: deleteListExamplePayload,
  perform: async (context, { connection, projectId, listId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `/projects/${projectId}/lists/${listId}`,
    );
    return { data };
  },
  inputs: deleteListInputs,
});

export default { deleteList };
