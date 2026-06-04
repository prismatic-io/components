import { action, util } from "@prismatic-io/spectral";
import { connectionInput, purchaseRequisitionNumberInput, requestBodyCode } from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { ADD_ITEM_TO_PURCHASE_REQUISITION_DEFAULT_VALUE } from "../constants";

export const addItemToPurchaseRequisition = action({
  display: {
    label: "Add Item To Purchase Requisition",
    description:
      "Adds an item to a purchase requisition using the purchase requisition number provided.",
  },
  perform: async (_, { connectionInput, purchaseRequisitionNumberInput, requestBodyCode }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.post(
        `/sap/opu/data/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader('${purchaseRequisitionNumberInput}')/to_PurchaseReqnItem`,
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
    connectionInput,
    purchaseRequisitionNumberInput,
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: JSON.stringify(ADD_ITEM_TO_PURCHASE_REQUISITION_DEFAULT_VALUE),
    },
  },
});
