import { action, outputSchema, util } from "@prismatic-io/spectral";
import { Readable } from "node:stream";
import { createClient } from "../../client";
import { updateFileExamplePayload } from "../../examplePayloads";
import { updateFileInputs } from "../../inputs";
import { updateFileOutputSchema } from "../../outputSchemas";

export const updateFile = action({
  display: {
    label: "Update File",
    description: "Update a file to the specified drive.",
  },
  inputs: updateFileInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, { connection, driveId, itemId, fileData }) => {
    const client = await createClient(connection, debug);
    const { data } = util.types.toData(fileData);
    const { data: updatedData } = await client.put(
      `/drives/${driveId}/items/${itemId}/content`,
      Readable.from(data),
    );

    return {
      data: updatedData,
    };
  },
  examplePerform: async () => updateFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFileOutputSchema,
  }),
  examplePayload: updateFileExamplePayload,
});
