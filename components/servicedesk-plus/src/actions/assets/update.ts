import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAssetResponse as updateAssetResponse } from "../../examplePayloads";
import {
  assetAdditionalFields,
  assetId,
  assetName,
  attributes,
  connectionInput,
  product,
  state,
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
    additionalFields: assetAdditionalFields,
    attributes,
    connectionInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      assetId,
      assetName,
      additionalFields,
      attributes,
      product,
      state,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      asset: {
        name: assetName,
        barcode: additionalFields.barCode,
        asset_tag: additionalFields.assetTag,
        product,
        state,
        state_history_comments: additionalFields.stateHistoryComments,
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
