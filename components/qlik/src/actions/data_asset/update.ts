import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDataAssetsExamplePayload } from "../../examplePayloads";
import {
  appId,
  appType,
  connectionInput,
  dataAssetInput,
  dataAssetsId,
  technicalName,
} from "../../inputs";

export const updateDataAssets = action({
  display: {
    label: "Update Data Asset",
    description: "Update data asset by ID.",
  },
  examplePayload: updateDataAssetsExamplePayload,
  perform: async (
    context,
    { connection, dataAssetsId, appId, appType, dataAssetInput, technicalName },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.put(`/data-assets/${dataAssetsId}`, {
      id: dataAssetsId,
      appId: appId || undefined,
      appType: appType || undefined,
      technicalName: technicalName || undefined,
      ...dataAssetInput,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataAssetsId,
    appId,
    appType,
    technicalName,
    dataAssetInput,
  },
});
