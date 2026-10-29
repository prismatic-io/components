import { action, type KeyValuePair, util } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { createPurchaseOrderPayload as examplePayload } from "../../examplePayloads";
import {
  apAccountIdInput,
  connectionInput,
  dynamicValues as dynamicValuesInput,
  fieldValues as fieldValuesInput,
  linesInput,
  vendorIdInput,
} from "../../inputs";

export const createPurchaseOrder = action({
  display: {
    label: "Create Purchase Order",
    description: "Create a new Purchase Order.",
  },
  inputs: {
    connection: connectionInput,
    apAccountId: apAccountIdInput,
    vendorId: vendorIdInput,
    lines: linesInput,
    dynamicValues: dynamicValuesInput,
    fieldValues: fieldValuesInput,
  },
  perform: async (context, params) => {
    const client = createHttpClient(params.connection, context.debug.enabled);

    const payload = {
      ...util.types.keyValPairListToObject(
        (params.dynamicValues as KeyValuePair[]) || [],
      ),
      ...util.types.keyValPairListToObject(params.fieldValues || []),
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
