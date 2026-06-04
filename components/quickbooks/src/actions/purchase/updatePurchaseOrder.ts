import { action, type KeyValuePair, util } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { updatePurchaseOrderPayload as examplePayload } from "../../examplePayloads";
import {
  apAccountIdInput,
  baseRecord,
  connectionInput,
  dynamicValues as dynamicValuesInput,
  fieldValues as fieldValuesInput,
  linesInput,
  purchaseOrderId,
  syncToken as syncTokenInput,
  vendorIdInput,
} from "../../inputs";
import { cleanStringInput } from "../../util";

export const updatePurchaseOrder = action({
  display: {
    label: "Update Purchase Order",
    description: "Update an existing Purchase Order.",
  },
  inputs: {
    connection: connectionInput,
    id: {
      ...purchaseOrderId,
      comments: "The id of the purchase order to update.",
    },
    syncToken: syncTokenInput,
    baseRecord,
    apAccountId: {
      ...apAccountIdInput,
      required: false,
      clean: cleanStringInput,
    },
    vendorId: { ...vendorIdInput, required: false, clean: cleanStringInput },
    lines: { ...linesInput, required: false },
    dynamicValues: dynamicValuesInput,
    fieldValues: fieldValuesInput,
  },
  perform: async (context, params) => {
    const client = createHttpClient(params.connection, context.debug.enabled);

    const base =
      typeof params.baseRecord === "object" &&
      Object.keys(params.baseRecord).length > 0
        ? params.baseRecord
        : {};

    const payload = {
      ...base,
      ...util.types.keyValPairListToObject(
        (params.dynamicValues as KeyValuePair[]) || [],
      ),
      ...util.types.keyValPairListToObject(params.fieldValues || []),
      Id: params.id,
      SyncToken: params.syncToken,
      Line: params.lines,
      APAccountRef: {
        value: params.apAccountId,
      },
      VendorRef: {
        value: params.vendorId,
      },
    };

    const { data } = await client.post("/purchaseorder", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { data: data.PurchaseOrder };
  },
  examplePayload,
});
