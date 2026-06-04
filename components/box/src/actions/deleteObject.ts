import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { path, connectionInput } from "../inputs";
import { getPathEntries } from "../utils";

export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Delete a Folder or File at the specified path",
  },
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));

    const { id, type, name } = pathEntries.slice(-1)[0];

    let result: unknown;
    if (type === "folder") {
      result = await client.folders.delete(id);
    } else if (type === "file") {
      result = await client.files.delete(id);
    } else {
      throw Error(`'${name}' is neither a file nor a folder`);
    }

    return {
      data: result,
    };
  },
  inputs: { path, boxConnection: connectionInput },
});
