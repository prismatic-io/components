import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { downloadFileExamplePayload } from "../../examplePayloads";
import { downloadFileInputs } from "../../inputs";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download a file from the specified drive.",
  },
  inputs: downloadFileInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, { connection, itemId, driveId }) => {
    const client = await createClient(connection, debug);
    try {
      const { data: item } = await client.get(`/drives/${driveId}/items/${itemId}`);
      const { data: content } = await client.get(`/drives/${driveId}/items/${itemId}/content`, {
        responseType: "arraybuffer",
      });

      return {
        data: Buffer.from(content),
        contentType: item.file.mimeType,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
  examplePerform: async () => downloadFileExamplePayload,
  examplePayload: downloadFileExamplePayload,
});
