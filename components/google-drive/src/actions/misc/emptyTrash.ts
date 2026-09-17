import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { emptyTrashInputs } from "../../inputs";
import { emptyTrashOutputSchema } from "../../outputSchemas";
import { emptyTrashExamplePayload } from "../../examplePayloads";
export const emptyTrash = action({
  display: {
    label: "Empty Trash",
    description: "Empty the trash of deleted files",
  },
  performSafety: "notAllowed",
  perform: async (_context, { connection }) => {
    const drive = createClient(connection);
    const { data } = await drive.files.emptyTrash();
    return {
      data,
    };
  },
  inputs: emptyTrashInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyTrashOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({ data: {} }),
  examplePayload: emptyTrashExamplePayload,
});
export default emptyTrash;
