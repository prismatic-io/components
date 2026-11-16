import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getFileExamplePayload } from "../../examplePayloads";
import { getFileInputs } from "../../inputs";

export const getFile = action({
  display: {
    label: "Get File",
    description:
      "Get the content of a text or JSON file from a drive. For binary files, use the Download File action.",
  },
  inputs: getFileInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, { connection, driveId, itemId }) => {
    const client = await createClient(connection, debug);
    try {
      const { data } = await client.get(`/drives/${driveId}/items/${itemId}/content`);
      return {
        data,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
  examplePerform: async () => getFileExamplePayload,
  examplePayload: getFileExamplePayload,
});
