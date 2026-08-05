import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectProjectInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import {
  fetchMoreData,
  handleMultipleWorkspacesError,
  mapToLabelKey,
} from "../util";
const selectProject = dataSource({
  display: {
    label: "Select Project",
    description: "Select a project from a dropdown menu.",
  },
  inputs: selectProjectInputs,
  perform: async (_context, { connection, team, workspace }) => {
    try {
      const client = await createAsanaClient(connection, false);
      const canPaginate = !!(workspace || team);
      const data = await fetchMoreData<DataSource>(
        client,
        "/projects",
        [],
        canPaginate,
        {
          workspace,
          team,
          limit: canPaginate ? 100 : undefined,
        },
      );
      const result = mapToLabelKey(data);
      return { result };
    } catch (err) {
      handleMultipleWorkspacesError(err);
      throw err;
    }
  },
  dataSourceType: "picklist",
});
export default {
  selectProject,
};
