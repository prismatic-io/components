import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAssetResponse as updateAssetResponse } from "../../examplePayloads";
import {
  assetId,
  assetName,
  assetTag,
  attributes,
  barCode,
  connectionInput,
  product,
  state,
  stateHistoryComments,
} from "../../inputs";
import { createPayload } from "../../util";

export const updateAsset = action({
  display: {
    label: "Update Asset",
    description: "Edit an existing asset",
  },
  inputs: {
    assetId: {
      ...assetId,
      required: true,
    },
    assetName,
    state: {
      ...state,
      required: false,
    },
    product,
    assetTag,
    stateHistoryComments,
    barCode,
    attributes,
    connectionInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      assetId,
      assetName,
      barCode,
      attributes,
      assetTag,
      product,
      state,
      stateHistoryComments,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      asset: {
        name: assetName,
        barcode: barCode,
        asset_tag: assetTag,
        product,
        state,
        state_history_comments: stateHistoryComments,
        ...attributes,
      },
    });
    const { data } = await client.put(`/assets/${assetId}`, payload);
    return { data };
  },
  examplePayload: {
    data: updateAssetResponse,
  },
});
