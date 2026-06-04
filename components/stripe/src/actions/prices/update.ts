import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { updatePriceExamplePayload } from "../../examplePayloads/prices";
import {
  active,
  connectionInput,
  fieldValues,
  metadata,
  nickname,
  priceId,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updatePrice = action({
  display: {
    label: "Update Price",
    description: "Update an existing price by ID.",
  },
  perform: async (
    context,
    { priceId, active, nickname, fieldValues, metadata, timeout, stripeConnection },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.prices.update(util.types.toString(priceId), {
        active: util.types.toBool(active) || undefined,
        nickname: util.types.toString(nickname) || undefined,
        metadata: keyValPairListToObject(metadata),
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
      }),
    };
  },
  inputs: {
    priceId,
    active,
    nickname,
    fieldValues,
    metadata,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: updatePriceExamplePayload,
});
