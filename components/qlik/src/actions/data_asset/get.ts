import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDataAssetsExamplePayload } from "../../examplePayloads";
import { connectionInput, dataAssetsId, projections } from "../../inputs";

export const getDataAssets = action({
  display: {
    label: "Get Data Asset",
    description: "Get data asset by ID.",
  },
  examplePayload: getDataAssetsExamplePayload,
  perform: async (context, { connection, dataAssetsId, projections }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/data-assets/${dataAssetsId}`, {
      params: {
        projections: projections || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataAssetsId,
    projections,
  },
});
