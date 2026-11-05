import { action, util } from "@prismatic-io/spectral";
import {
  filter,
  inlinecount,
  connectionInput,
  listPurchaseRequisitionsOrderBy,
  skip,
  top,
  listPurchaseRequisitionSelect,
  listPurchaseRequisitionExpand,
} from "../inputs";
import { getSapClient } from "../client";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const listPurchaseRequisitions = action({
  display: {
    label: "List Purchase Requisitions",
    description: "Gets the header details of all the purchase requisitions in the system.",
  },
  perform: async (
    _,
    { top, expand, skip, filter, inlinecount, orderBy, select, connectionInput },
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
        "/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader",
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
    orderBy: listPurchaseRequisitionsOrderBy,
    select: listPurchaseRequisitionSelect,
    expand: listPurchaseRequisitionExpand,
  },
});
