import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { connectionInput, path } from "../inputs";
import { getPathEntries } from "../utils";
import { createFolderExamplePayload } from "../examplePayloads";

export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a Folder at the specified path",
  },
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(path),
      false,
    );

    const { name: newFolderName } = pathEntries.slice(-1)[0];
    const { id, type, name } = pathEntries.slice(-2)[0];

    if (type !== "folder") {
      throw Error(`'${name}' is not a folder`);
    }

    const result = await client.folders.create(id, newFolderName);
    return {
      data: result,
    };
  },
  inputs: { path, boxConnection: connectionInput },
  examplePayload: createFolderExamplePayload,
});
