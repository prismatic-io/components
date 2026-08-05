import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectUserInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import {
  fetchMoreData,
  handleMultipleWorkspacesError,
  mapToLabelKey,
} from "../util";
const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from a dropdown menu.",
  },
  inputs: selectUserInputs,
  perform: async (_context, { connection, workspaceId }) => {
    try {
      const client = await createAsanaClient(connection, false);
      const data = await fetchMoreData<DataSource>(client, "/users", [], true, {
        workspace: workspaceId,
      });
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
  selectUser,
};
