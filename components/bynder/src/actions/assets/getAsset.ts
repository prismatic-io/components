import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAssetResponse } from "../../examplePayloads";
import { connection, id, stats, versions } from "../../inputs";

export const getAsset = action({
  display: {
    label: "Get Asset",
    description: "Retrieve a specific asset",
  },
  inputs: {
    id: {
      ...id,
      dataSource: "selectAsset",
    },
    versions,
    stats,
    connection,
  },
  perform: async (context, { connection, id, stats, versions }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/media/${id}`, {
      params: { stats, versions },
    });
    return { data };
  },
  examplePayload: {
    data: getAssetResponse,
  },
});
