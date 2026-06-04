import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { moveFileInputs } from "../../inputs";
import { moveFileExamplePayload } from "../../examplePayloads/files/moveFileExamplePayload";

export const moveFile = action({
  display: {
    label: "Move a File",
    description: "Move a File in a Drive",
  },
  inputs: moveFileInputs,
  perform: async (context, { connection, driveId, itemId, parentItemId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/drives/${driveId}/items/${itemId}`, {
      parentReference: {
        id: parentItemId,
      },
    });
    return { data };
  },
  examplePayload: moveFileExamplePayload,
});
