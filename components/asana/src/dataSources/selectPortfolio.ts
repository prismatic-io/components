import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectPortfolioExamplePayload } from "../examplePayloads";
import { selectPortfolioInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import {
  fetchMoreData,
  handleMultipleWorkspacesError,
  mapToLabelKey,
} from "../util";
const selectPortfolio = dataSource({
  display: {
    label: "Select Portfolio",
    description: "Select a portfolio from a dropdown menu.",
  },
  inputs: selectPortfolioInputs,
  perform: async (_context, { connection, workspaceId }) => {
    try {
      const client = await createAsanaClient(connection, false);
      const {
        data: {
          data: { gid: userGid },
        },
      } = await client.get("/users/me");
      const data = await fetchMoreData<DataSource>(
        client,
        "/portfolios",
        [],
        true,
        {
          workspace: workspaceId || undefined,
          owner: userGid,
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
  examplePayload: selectPortfolioExamplePayload,
});
export default {
  selectPortfolio,
};
