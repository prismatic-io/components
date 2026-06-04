import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { connectionInput, workspaceId } from "../inputs";
import { fetchMoreData, mapToLabelKey } from "../util";
import type { DataSource } from "../types/Project";

const selectCustomField = dataSource({
  display: {
    label: "Select Custom Field",
    description: "Select a custom field from a dropdown menu.",
  },
  inputs: {
    connection: connectionInput,
    workspaceId: { ...workspaceId, dataSource: undefined },
  },
  perform: async (_context, { connection, workspaceId }) => {
    const client = await createAsanaClient(connection, false);
    const data = await fetchMoreData<DataSource>(
      client,
      `/workspaces/${workspaceId}/custom_fields`,
      [],
      true,
    );

    const result = mapToLabelKey(data);
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Priority", key: "1202467472002610" }],
  },
});

export default {
  selectCustomField,
};
