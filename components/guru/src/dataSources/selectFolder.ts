import { dataSource, type Element } from "@prismatic-io/spectral";
import { getGuruClient } from "../client";
import { selectFolderInputs } from "../inputs";
import { fetchGuruResults } from "../util";
import type { GuruFolder } from "../types";

export const selectFolder = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Folder",
    description: "Select a folder from your Guru workspace",
  },
  perform: async (_context, { connection, q, search }) => {
    const client = getGuruClient(connection, false);
    const queryParams = {
      q,
      search,
      sortField: "title",
      sortOrder: "ASC",
    };
    const folders = await fetchGuruResults<GuruFolder>(
      client,
      "/folders",
      true,
      queryParams,
    );

    return {
      result: folders.map(
        (folder): Element => ({
          label: folder.title,
          key: folder.id,
        }),
      ),
    };
  },
  inputs: selectFolderInputs,
});
