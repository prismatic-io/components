import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { fromPath, toPath, connectionInput } from "../inputs";
import { getPathEntries } from "../utils";
import { copyObjectExamplePayload } from "../examplePayloads";
export const copyObject = action({
  display: {
    label: "Copy Object",
    description: "Copy a Folder or File from one path to another",
  },
  perform: async (context, { fromPath, toPath, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const fromPathEntries = await getPathEntries(
      client,
      util.types.toString(fromPath),
    );
    const toPathEntries = await getPathEntries(
      client,
      util.types.toString(toPath),
      false,
    );
    const {
      id: sourceId,
      type: sourceType,
      name: sourceName,
    } = fromPathEntries.slice(-1)[0];
    const { name: newName } = toPathEntries.slice(-1)[0];
    const {
      id: destId,
      type: destType,
      name: destName,
    } = toPathEntries.slice(-2)[0];
    if (destType !== "folder") {
      throw Error(`'${destName} is not a folder`);
    }
    let data: unknown;
    if (sourceType === "folder") {
      const result = await client.folders.copyFolder(
        util.types.toString(sourceId),
        { parent: { id: util.types.toString(destId) }, name: newName },
      );
      data = result.rawData;
    } else if (sourceType === "file") {
      const result = await client.files.copyFile(
        util.types.toString(sourceId),
        {
          parent: { id: util.types.toString(destId) },
          name: newName,
        },
      );
      data = result.rawData;
    } else {
      throw Error(`'${sourceName}' is neither a file nor a folder`);
    }
    return {
      data,
    };
  },
  inputs: { fromPath, toPath, boxConnection: connectionInput },
  examplePayload: copyObjectExamplePayload,
});
