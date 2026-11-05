import { action } from "@prismatic-io/spectral";
import { connection, skipToken, top } from ".././inputs";
import { createClient } from "../client";
import { listDatasetsExamplePayload } from "../examplePayloads";

export const listDatasets = action({
  display: {
    label: "List Datasets",
    description: "Returns a list of datasets from 'My Workspace'",
  },
  perform: async (context, params) => {
    const client = createClient({ connection: params.connection }, context.debug.enabled);
    const { data } = await client.get("/datasets", {
      params: { $top: params.top, $skipToken: params.skipToken },
    });

    return {
      data,
    };
  },
  inputs: { connection, top, skipToken },
  examplePayload: listDatasetsExamplePayload,
});
export default listDatasets;
