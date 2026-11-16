import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { moveFileExamplePayload } from "../../examplePayloads";
import { moveFileInputs } from "../../inputs";
import { moveFileOutputSchema } from "../../outputSchemas";

export const moveFile = action({
  display: {
    label: "Move File",
    description: "Move a File in a Drive.",
  },
  inputs: moveFileInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, driveId, itemId, parentItemId }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/drives/${driveId}/items/${itemId}`, {
      parentReference: {
        id: parentItemId,
      },
    });
    return { data };
  },
  examplePerform: async (_context, { parentItemId }) => ({
    data: {
      ...moveFileExamplePayload.data,
      parentReference: {
        ...moveFileExamplePayload.data.parentReference,
        id: parentItemId,
      },
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: moveFileOutputSchema,
  }),
  examplePayload: moveFileExamplePayload,
});
