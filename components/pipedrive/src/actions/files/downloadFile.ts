import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, fileIdInput } from "../../inputs";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Downloads one file.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data, headers } = await client.get(`/files/${id}/download`, {
      responseType: "arraybuffer",
    });
    return { data, contentType: headers["content-type"] };
  },
  inputs: {
    connection: connectionInput,
    id: fileIdInput,
  },
  examplePayload: {
    data: Buffer.from("Hello, World"),
    contentType: "text/plain",
  },
});
