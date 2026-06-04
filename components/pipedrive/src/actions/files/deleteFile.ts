import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, fileIdInput } from "../../inputs";

export const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Deletes a file.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/files/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: fileIdInput,
  },
  examplePayload: { data: { success: true, data: { id: 123 } } },
});
