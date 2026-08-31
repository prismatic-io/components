import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { FOLDER_TYPE } from "../../constants";
import { listFolderExamplePayload } from "../../examplePayloads";
import { listFolderInputs } from "../../inputs";
import { listFolderOutputSchema } from "../../outputSchemas";
import { getFolderEntries, getPathEntries } from "../../util";
export const listFolder = action({
  display: {
    label: "List Folder (Deprecated)",
    description:
      "List Folder contents at the specified path. This version of " +
      "the action is being deprecated. Please replace action with List Folder.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAuthorizedClient({
      boxConnection: params.boxConnection,
    });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(params.path),
    );
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type !== FOLDER_TYPE) {
      throw Error(`'${name}' is not a folder`);
    }
    const allEntries = await getFolderEntries({
      client,
      id,
      limit: util.types.toInt(params.pagination.limit) || undefined,
      marker: util.types.toString(params.pagination.marker) || undefined,
      offset: util.types.toInt(params.pagination.offset) || undefined,
    });
    return {
      data: allEntries,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listFolderExamplePayload.data,
  }),
  inputs: listFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFolderOutputSchema,
  }),
  examplePayload: listFolderExamplePayload,
});
