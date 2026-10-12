import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { downloadFileInputs } from "../../inputs";
import { downloadFileExamplePayload } from "../../examplePayloads";
import { downloadFileOutputSchema } from "../../outputSchemas";
export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Downloads one file.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data, headers } = await client.get(`/files/${id}/download`, {
      responseType: "arraybuffer",
    });
    const contentType = headers["content-type"];
    return {
      data,
      contentType: typeof contentType === "string" ? contentType : undefined,
    };
  },
  inputs: downloadFileInputs,
  examplePayload: downloadFileExamplePayload,
  examplePerform: async () => downloadFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: downloadFileOutputSchema,
  }),
});
