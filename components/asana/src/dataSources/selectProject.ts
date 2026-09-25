import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { DEFAULT_PAGE_LIMIT } from "../constants";
import { selectProjectInputs } from "../inputs";
import type { DataSource } from "../types/resources";
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
          limit: canPaginate ? DEFAULT_PAGE_LIMIT : undefined,
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
