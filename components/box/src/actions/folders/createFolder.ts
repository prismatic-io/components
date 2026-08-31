import { action, outputSchema, util } from "@prismatic-io/spectral";
import { FOLDER_TYPE } from "../../constants";
import { createAuthorizedClient } from "../../client";
import { createFolderExamplePayload } from "../../examplePayloads";
import { createFolderInputs } from "../../inputs";
import { createFolderOutputSchema } from "../../outputSchemas";
import { getPathEntries, pathLeafName } from "../../util";
export const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a Folder at the specified path.",
  },
  performSafety: "notAllowed",
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(path),
      false,
    );
    const { name: newFolderName } = pathEntries.slice(-1)[0];
    const { id, type, name } = pathEntries.slice(-2)[0];
    if (type !== FOLDER_TYPE) {
      throw Error(`'${name}' is not a folder`);
    }
    const result = await client.folders.createFolder({
      name: util.types.toString(newFolderName),
      parent: { id: util.types.toString(id) },
    });
    return {
      data: result.rawData,
    };
  },
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createFolderExamplePayload.data,
      name: pathLeafName(path),
    },
  }),
  inputs: createFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFolderOutputSchema,
  }),
  examplePayload: createFolderExamplePayload,
});
