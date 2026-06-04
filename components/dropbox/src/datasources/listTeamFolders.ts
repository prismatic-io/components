import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { connectionInput, cursor, directoryPath, limit } from "../inputs";
import { handleDropboxError } from "../util";

export const listTeamFolders = dataSource({
  display: {
    label: "List Team Folders",
    description: "Fetch an array of team's folders",
  },
  inputs: {
    connection: connectionInput,
    path: {
      ...directoryPath,
      dataSource: undefined,
    },
    cursor,
    limit,
  },
  perform: async (_context, params) => {
    const dbx = createAuthorizedClient(params.connection);
    try {
      const {
        result: { team_folders },
      } =
        params.cursor !== ""
          ? await dbx.teamTeamFolderListContinue({
              cursor: util.types.toString(params.cursor),
            })
          : await dbx.teamTeamFolderList({
              limit: util.types.toInt(params.limit) || undefined,
            });

      const result = team_folders.map<Element>((folder) => ({
        label: folder.name,
        key: folder.team_folder_id,
      }));
      return { result };
    } catch (err) {
      handleDropboxError(err, [params.path]);
    }
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "MyExampleFolder", key: "0" }],
  },
});
