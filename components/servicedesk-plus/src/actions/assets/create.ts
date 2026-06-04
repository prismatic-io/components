import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAssetResponse } from "../../examplePayloads";
import {
  assetId,
  assetName,
  assetTag,
  barCode,
  connectionInput,
  keyValuePairParams,
  product,
  state,
  stateHistoryComments,
} from "../../inputs";
import { createPayload } from "../../util";

export const createAsset = action({
  display: {
    label: "Create Asset",
    description: "Create a new asset",
  },
  inputs: {
    assetName: {
      ...assetName,
      required: true,
    },
    state,
    product: {
      ...product,
      required: true,
    },
    assetId,
    assetTag,
    stateHistoryComments,
    barCode,
    keyValuePairParams,
    connectionInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      assetId,
      assetName,
      barCode,
      keyValuePairParams,
      assetTag,
      product,
      state,
      stateHistoryComments,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      asset: {
        id: assetId,
        name: assetName,
        barcode: barCode,
        asset_tag: assetTag,
        product,
        state,
        state_history_comments: stateHistoryComments,
        ...keyValuePairParams,
      },
    });
    const { data } = await client.post("/assets", payload);
    return { data };
  },
  examplePayload: {
    data: createAssetResponse,
  },
});
