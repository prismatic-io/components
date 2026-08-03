import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { path, connectionInput } from "../inputs";
import { getPathEntries } from "../utils";
import { deleteObjectExamplePayload } from "../examplePayloads";
export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Delete a Folder or File at the specified path",
  },
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type === "folder") {
      await client.folders.deleteFolderById(util.types.toString(id));
    } else if (type === "file") {
      await client.files.deleteFileById(util.types.toString(id));
    } else {
      throw Error(`'${name}' is neither a file nor a folder`);
    }
    return {
      data: {},
    };
  },
  inputs: { path, boxConnection: connectionInput },
  examplePayload: deleteObjectExamplePayload,
});
