import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAssetResponse } from "../../examplePayloads";
import {
  assetAdditionalFields,
  assetId,
  assetName,
  connectionInput,
  keyValuePairParams,
  product,
  state,
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
    additionalFields: assetAdditionalFields,
    keyValuePairParams,
    connectionInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      assetId,
      assetName,
      additionalFields,
      keyValuePairParams,
      product,
      state,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      asset: {
        id: assetId,
        name: assetName,
        barcode: additionalFields.barCode,
        asset_tag: additionalFields.assetTag,
        product,
        state,
        state_history_comments: additionalFields.stateHistoryComments,
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
