import { Readable } from "node:stream";
import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";
import { uploadFileOutputSchema } from "../../outputSchemas";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Uploads a file to the connected drive.",
  },
  inputs: uploadFileInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, fileName, fileData, timeout }) => {
    const client = getOneDriveClient(
      connection,
      context.debug.enabled,
      timeout,
    );
    const { data } = fileData;

    return {
      data: await handleErrors(
        client.put(`/me/drive/root:${fileName}:/content`, Readable.from(data)),
      ),
    };
  },
  examplePerform: async (_context, { fileName }) => ({
    data: {
      ...uploadFileExamplePayload.data,
      name: fileName.split("/").pop() ?? fileName,
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadFileOutputSchema,
  }),
  examplePayload: uploadFileExamplePayload,
});
