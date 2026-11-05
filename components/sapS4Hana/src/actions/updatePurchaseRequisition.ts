import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput, purchaseRequisitionNumberInput } from "../inputs";
import { UPDATE_PURCHASE_REQUISITION_DEFAULT_VALUE } from "../constants";

export const updatePurchaseRequisition = action({
  display: {
    label: "Update Purchase Requisition",
    description: "Updates the header details of a purchase requisition.",
  },
  perform: async (
    _context,
    { requestBodyCode, connectionInput, purchaseRequisitionNumberInput },
  ) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.patch(
        `/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader('${purchaseRequisitionNumberInput}')`,
        requestBodyCode,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: JSON.stringify(UPDATE_PURCHASE_REQUISITION_DEFAULT_VALUE),
    },
    connectionInput,
    purchaseRequisitionNumberInput,
  },
});
