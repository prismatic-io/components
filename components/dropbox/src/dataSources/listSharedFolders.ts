import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { listSharedFoldersDataSourceExamplePayload } from "../examplePayloads";
import { listSharedFoldersInputs } from "../inputs";
import { handleDropboxError } from "../util";
export const listSharedFolders = dataSource({
  display: {
    label: "List Shared Folders",
    description: "Fetch an array of shared folders.",
  },
  inputs: listSharedFoldersInputs,
  perform: async (_context, params) => {
    const dbx = createAuthorizedClient(params.connection);
    try {
      const {
        result: { entries },
      } =
        params.cursor !== ""
          ? await dbx.sharingListFoldersContinue({
              cursor: util.types.toString(params.cursor),
            })
          : await dbx.sharingListFolders({
              limit: util.types.toInt(params.limit) || undefined,
              actions: params.folderActions,
            });
      const result = entries.map<Element>((folder) => ({
        label: folder.name,
        key: folder.shared_folder_id,
      }));
      return { result };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  dataSourceType: "picklist",
  examplePayload: listSharedFoldersDataSourceExamplePayload,
});
