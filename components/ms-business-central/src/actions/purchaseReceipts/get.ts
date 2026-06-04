import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getPurchaseReceiptExamplePayload as examplePayload } from "../../examplePayloads";
import { getPurchaseReceiptInputs as inputs } from "../../inputs/purchaseReceipts/getPurchaseReceiptInputs";
import type { PurchaseReceipt } from "../../interfaces";

export const getPurchaseReceipt = action({
  display: {
    label: "Get Purchase Receipt",
    description: "Retrieves a purchase receipt object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, purchaseReceiptId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<PurchaseReceipt>(
      `/companies(${companyId})/purchaseReceipts(${purchaseReceiptId})`,
    );

    return { data };
  },
  inputs,
  examplePayload,
});
