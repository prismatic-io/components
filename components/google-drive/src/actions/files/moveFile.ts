import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { moveFileInputs } from "../../inputs";
import { moveFileExamplePayload } from "../../examplePayloads";
export const moveFile = action({
  display: {
    label: "Move File",
    description: "Move a file by file ID",
  },
  performSafety: "notAllowed",
  perform: async (_context, { connection, fileId, folderId }) => {
    const drive = createClient(connection);
    const file = await drive.files.get({
      fileId,
      fields: "parents",
    });
    const previousParents = file.data.parents.join(",");
    const { data } = await drive.files.update({
      fileId,
      addParents: folderId,
      removeParents: previousParents,
      supportsAllDrives: true,
    });
    return { data };
  },
  inputs: moveFileInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => moveFileExamplePayload,
  examplePayload: moveFileExamplePayload,
});
export default moveFile;
