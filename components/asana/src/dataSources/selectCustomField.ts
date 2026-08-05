import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectCustomFieldExamplePayload } from "../examplePayloads";
import { selectCustomFieldInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import { fetchMoreData, mapToLabelKey } from "../util";
const selectCustomField = dataSource({
  display: {
    label: "Select Custom Field",
    description: "Select a custom field from a dropdown menu.",
  },
  inputs: selectCustomFieldInputs,
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
  examplePayload: selectCustomFieldExamplePayload,
});
export default {
  selectCustomField,
};
