import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listExportTypesInputs } from "../../inputs";
import { listExportTypesExamplePayload } from "../../examplePayloads";
export const listExportTypes = action({
  display: {
    label: "List File's Export Types",
    description: "List the available export types of a file by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, fileId }) => {
    const drive = createClient(connection);
    const fileData = await drive.files.get({
      fileId,
      fields: "*",
    });
    const exportTypes = Object.keys(fileData.data?.exportLinks ?? {});
    if (exportTypes.length < 1) {
      context.logger.warn(
        "Export Types do not exist on files with binary content. Please provide a resource with a complex file type (Google Doc, Google Sheet, Google Photo etc..)",
      );
    }
    return {
      data: exportTypes,
    };
  },
  inputs: listExportTypesInputs,
  examplePayload: listExportTypesExamplePayload,
});
export default listExportTypes;
