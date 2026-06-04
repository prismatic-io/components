import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getListOfAttachmentsInputs } from "../../inputs";
import { getListOfAttachmentsExamplePayload } from "../../examplePayloads";

export const getListOfAttachments = action({
  display: {
    label: "Get List Of Attachments",
    description: "Retrieves all attachments belonging to a particular task.",
  },
  examplePayload: getListOfAttachmentsExamplePayload,
  perform: async (context, { connection, projectId, listId, taskId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/projects/${projectId}/lists/${listId}/tasks/${taskId}/attachments`,
      {
        headers: { Accept: "application/json" },
      },
    );
    return { data };
  },
  inputs: getListOfAttachmentsInputs,
});

export default { getListOfAttachments };
