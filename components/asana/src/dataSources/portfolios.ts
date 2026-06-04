import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { connectionInput, workspaceId } from "../inputs";
import {
  cleanString,
  fetchMoreData,
  handleMultipleWorkspacesError,
  mapToLabelKey,
} from "../util";
import type { DataSource } from "../types/Project";

const selectPortfolio = dataSource({
  display: {
    label: "Select Portfolio",
    description: "Select a portfolio from a dropdown menu.",
  },
  inputs: {
    connection: connectionInput,
    workspaceId: {
      ...workspaceId,
      required: false,
      dataSource: undefined,
      clean: cleanString,
    },
  },
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
  examplePayload: {
    result: [{ label: "Example Portfolio", key: "12345" }],
  },
});

export default {
  selectPortfolio,
};
