import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectWorkspaceInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import { fetchMoreData, mapToLabelKey } from "../util";
const selectWorkspace = dataSource({
  display: {
    label: "Select Workspace",
    description: "Select a workspace from a dropdown menu.",
  },
  inputs: selectWorkspaceInputs,
  perform: async (_context, params) => {
    const client = await createAsanaClient(params.connection, false);
    const data = await fetchMoreData<DataSource>(
      client,
      "/workspaces",
      [],
      true,
      {
        limit: 100,
      },
    );
    const result = mapToLabelKey(data);
    return { result };
  },
  dataSourceType: "picklist",
});
export default {
  selectWorkspace,
};
