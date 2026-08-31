import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { FILE_TYPE, FOLDER_TYPE } from "../../constants";
import { moveObjectExamplePayload } from "../../examplePayloads";
import { moveObjectInputs } from "../../inputs";
import { moveObjectOutputSchema } from "../../outputSchemas";
import { getPathEntries, pathLeafName } from "../../util";
export const moveObject = action({
  display: {
    label: "Move Object",
    description: "Move a Folder or File from one path to another.",
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
    );
    const {
      id: sourceId,
      type: sourceType,
      name: sourceName,
    } = fromPathEntries.slice(-1)[0];
    const {
      id: destId,
      type: destType,
      name: destName,
    } = toPathEntries.slice(-1)[0];
    if (destType !== FOLDER_TYPE) {
      throw Error(`'${destName} is not a folder`);
    }
    let data: unknown;
    if (sourceType === FOLDER_TYPE) {
      const result = await client.folders.updateFolderById(
        util.types.toString(sourceId),
        { requestBody: { parent: { id: util.types.toString(destId) } } },
      );
      data = result.rawData;
    } else if (sourceType === FILE_TYPE) {
      const result = await client.files.updateFileById(
        util.types.toString(sourceId),
        { requestBody: { parent: { id: util.types.toString(destId) } } },
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
    const name = pathLeafName(fromPath);
    return {
      data: {
        ...moveObjectExamplePayload.data,
        name,
        type: name.includes(".") ? FILE_TYPE : FOLDER_TYPE,
        parent: {
          ...moveObjectExamplePayload.data.parent,
          name: pathLeafName(toPath),
        },
      },
    };
  },
  inputs: moveObjectInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: moveObjectOutputSchema,
  }),
  examplePayload: moveObjectExamplePayload,
});
