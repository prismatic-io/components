import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { FILE_TYPE, FOLDER_TYPE } from "../../constants";
import { deleteObjectExamplePayload } from "../../examplePayloads";
import { deleteObjectInputs } from "../../inputs";
import { getPathEntries } from "../../util";
export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Delete a Folder or File at the specified path.",
  },
  performSafety: "notAllowed",
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type === FOLDER_TYPE) {
      await client.folders.deleteFolderById(util.types.toString(id));
    } else if (type === FILE_TYPE) {
      await client.files.deleteFileById(util.types.toString(id));
    } else {
      throw Error(`'${name}' is neither a file nor a folder`);
    }
    return {
      data: {},
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteObjectExamplePayload.data,
  }),
  inputs: deleteObjectInputs,
  examplePayload: deleteObjectExamplePayload,
});
