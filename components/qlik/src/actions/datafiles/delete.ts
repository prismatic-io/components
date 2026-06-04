import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDataFileExamplePayload } from "../../examplePayloads";
import { connectionInput, dataFileId } from "../../inputs";

export const deleteDataFile = action({
  display: {
    label: "Delete Data File",
    description: "Deletes a specific Data File.",
  },
  examplePayload: deleteDataFileExamplePayload,
  perform: async (context, { connection, dataFileId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/data-files/${dataFileId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataFileId,
  },
});
