import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { BOTH_ENTRY_FILTER } from "../constants";
import { listFoldersExamplePayload } from "../examplePayloads";
import { listFoldersInputs } from "../inputs";
import { filterEntries, handleDropboxError } from "../util";
export const listFolders = dataSource({
  display: {
    label: "List Folders",
    description: "Fetch an array of folders.",
  },
  inputs: listFoldersInputs,
  perform: async (_context, params) => {
    const dbx = createAuthorizedClient(params.connection);
    try {
      const {
        result: { entries },
      } =
        params.cursor !== ""
          ? await dbx.filesListFolderContinue({
              cursor: util.types.toString(params.cursor),
            })
          : await dbx.filesListFolder({
              path: util.types.toString(params.path),
              limit: util.types.toInt(params.limit) || undefined,
              recursive: util.types.toBool(params.recursive),
            });
      const filteredEntries =
        params.entryFilter === BOTH_ENTRY_FILTER
          ? entries
          : filterEntries(entries, params.entryFilter);
      const result = filteredEntries.map<Element>((folder) => ({
        label: folder.name,
        key: (folder as any).id,
      }));
      return { result };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  dataSourceType: "picklist",
  examplePayload: listFoldersExamplePayload,
});
