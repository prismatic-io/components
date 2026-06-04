import { action, util } from "@prismatic-io/spectral";
import { connectionInput, requestBodyCode } from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { CREATE_PURCHASE_REQUISITION_DEFAULT_VALUE } from "../constants";

export const createPurchaseRequisition = action({
  display: {
    label: "Create Purchase Requisition",
    description: "Creates a purchase requisition with one or more items.",
  },
  perform: async (_, { connectionInput, requestBodyCode }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.post(
        "/sap/opu/data/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader",
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
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: JSON.stringify(CREATE_PURCHASE_REQUISITION_DEFAULT_VALUE),
    },
  },
});
