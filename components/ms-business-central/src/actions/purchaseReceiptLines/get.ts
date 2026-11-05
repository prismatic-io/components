import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getPurchaseReceiptLineExamplePayload as examplePayload } from "../../examplePayloads";
import { getPurchaseReceiptLineInputs as inputs } from "../../inputs/purchaseReceiptLines/getPurchaseReceiptLineInputs";
import type { PurchaseReceiptLine } from "../../interfaces";

export const getPurchaseReceiptLine = action({
  display: {
    label: "Get Purchase Receipt Line",
    description: "Retrieves a purchase receipt line object in your Business Central Organization.",
  },
  perform: async (context, { companyId, connection, purchaseReceiptLineId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<PurchaseReceiptLine>(
      `/companies(${companyId})/purchaseReceiptLines(${purchaseReceiptLineId})`,
    );

    return { data };
  },
  inputs,
  examplePayload,
});
