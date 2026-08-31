import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { FILE_TYPE, FOLDER_TYPE } from "../../constants";
import { copyObjectExamplePayload } from "../../examplePayloads";
import { copyObjectInputs } from "../../inputs";
import { copyObjectOutputSchema } from "../../outputSchemas";
import { getPathEntries, pathLeafName } from "../../util";
export const copyObject = action({
  display: {
    label: "Copy Object",
    description: "Copy a Folder or File from one path to another.",
  },
  performSafety: "notAllowed",
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
    if (destType !== FOLDER_TYPE) {
      throw Error(`'${destName} is not a folder`);
    }
    let data: unknown;
    if (sourceType === FOLDER_TYPE) {
      const result = await client.folders.copyFolder(
        util.types.toString(sourceId),
        { parent: { id: util.types.toString(destId) }, name: newName },
      );
      data = result.rawData;
    } else if (sourceType === FILE_TYPE) {
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
  examplePerform: async (
    _context,
    { fromPath, toPath },
  ): Promise<{
    data: unknown;
  }> => {
    const sourceName = pathLeafName(fromPath);
    return {
      data: {
        ...copyObjectExamplePayload.data,
        name: pathLeafName(toPath),
        type: sourceName.includes(".") ? FILE_TYPE : FOLDER_TYPE,
      },
    };
  },
  inputs: copyObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: copyObjectOutputSchema,
  }),
  examplePayload: copyObjectExamplePayload,
});
