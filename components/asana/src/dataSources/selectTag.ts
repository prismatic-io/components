import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectTagInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import { fetchMoreData, mapToLabelKey } from "../util";
const selectTag = dataSource({
  display: {
    label: "Select Tag",
    description: "Select a tag from a dropdown menu.",
  },
  inputs: selectTagInputs,
  perform: async (_context, { connection, workspaceId }) => {
    const client = await createAsanaClient(connection, false);
    const data = await fetchMoreData<DataSource>(
      client,
      `/workspaces/${workspaceId}/tags`,
      [],
      true,
    );
    const result = mapToLabelKey(data);
    return { result };
  },
  dataSourceType: "picklist",
});
export default {
  selectTag,
};
