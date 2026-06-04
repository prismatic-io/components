import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, datasetId, skipToken, top } from "../inputs";
import { listTablesExamplePayload } from "../examplePayloads";

export const listTables = action({
  display: {
    label: "List Tables",
    description: "Returns a list of tables tables within the specified dataset from 'My Workspace'",
  },
  perform: async (context, params) => {
    const client = createClient({ connection: params.connection }, context.debug.enabled);
    const { data } = await client.get(`/datasets/${params.datasetId}/tables`, {
      params: { $top: params.top, $skipToken: params.skipToken },
    });

    return {
      data,
    };
  },
  inputs: { connection, datasetId, top, skipToken },
  examplePayload: listTablesExamplePayload,
});
export default listTables;
