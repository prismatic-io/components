import { action, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  listPurchaseRequisitionSelect as getPurchaseRequisitionSelect,
  listPurchaseRequisitionExpand as getPurchaseRequisitionExpand,
  purchaseRequisitionNumberInput,
} from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const getPurchaseRequisition = action({
  display: {
    label: "Get Purchase Requisition",
    description:
      "Gets the header details of a purchase requisition using the purchase requisition number provided.",
  },
  perform: async (_, { expand, select, connectionInput, purchaseRequisitionNumber }) => {
    const headers = {
      Accept: "application/json",
    };

    const params = {
      $expand: expand || undefined,
      $select: select || undefined,
    };

    const client = getSapClient(connectionInput, headers);
    try {
      const url = `/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader('${purchaseRequisitionNumber}')`;
      const { data } = await client.get(url, {
        params,
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);

      throw new Error(serialized);
    }
  },
  inputs: {
    connectionInput,
    select: getPurchaseRequisitionSelect,
    expand: getPurchaseRequisitionExpand,
    purchaseRequisitionNumber: purchaseRequisitionNumberInput,
  },
});
