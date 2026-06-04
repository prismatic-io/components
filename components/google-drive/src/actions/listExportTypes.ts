import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, fileId } from "../inputs";

export const listExportTypes = action({
  display: {
    label: "List File's Export Types",
    description: "List the available export types of a file by ID.",
  },
  perform: async (context, { connection, fileId }) => {
    const drive = createClient(connection);

    const fileData = await drive.files.get({
      fileId: util.types.toString(fileId),
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
  inputs: { connection, fileId },
  examplePayload: {
    data: [
      "application/x-vnd.oasis.opendocument.spreadsheet",
      "text/tab-separated-values",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/zip",
      "application/vnd.oasis.opendocument.spreadsheet",
    ],
  },
});

export default listExportTypes;
