import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDataAssetsExamplePayload } from "../../examplePayloads";
import {
  appId,
  appType,
  connectionInput,
  dataAssetInput,
  technicalName,
} from "../../inputs";

export const createDataAssets = action({
  display: {
    label: "Create Data Asset",
    description: "Save a new data asset.",
  },
  examplePayload: createDataAssetsExamplePayload,
  perform: async (
    context,
    { connection, appId, appType, dataAssetInput, technicalName },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/data-assets`, {
      id: null,
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
    appId,
    appType,
    technicalName,
    dataAssetInput,
  },
});
