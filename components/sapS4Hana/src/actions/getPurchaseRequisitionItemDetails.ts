import { action, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  filter,
  getPurchaseRequisitionItemDetailsExpand,
  getPurchaseRequisitionItemDetailsOrderBy,
  getPurchaseRequisitionItemDetailsSelect,
  inlinecount,
  purchaseRequisitionNumberInput,
  skip,
  top,
} from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const getPurchaseRequisitionItemDetails = action({
  display: {
    label: "Get Purchase Requisition Item Details",
    description: "Gets the item details of all the items in a purchase requisition",
  },
  perform: async (
    _,
    {
      connectionInput,
      purchaseRequisitionNumber,
      top,
      skip,
      filter,
      inlinecount,
      orderBy,
      select,
      expand,
    },
  ) => {
    const headers = {
      Accept: "application/json",
    };
    const params = {
      $top: top || undefined,
      $skip: skip || undefined,
      $filter: filter || undefined,
      $inlinecount: inlinecount || undefined,
      $orderby: orderBy || undefined,
      $select: select || undefined,
      $expand: expand || undefined,
    };

    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.get(
        `/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader('${purchaseRequisitionNumber}')/to_PurchaseReqnItem`,
        {
          params,
        },
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
    top,
    skip,
    filter,
    inlinecount,
    orderBy: getPurchaseRequisitionItemDetailsOrderBy,
    select: getPurchaseRequisitionItemDetailsSelect,
    expand: getPurchaseRequisitionItemDetailsExpand,
    purchaseRequisitionNumber: purchaseRequisitionNumberInput,
  },
});
