import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataQueryParams } from "../general";
import { purchaseOrderId } from "../purchaseOrders/shared";
export const listPurchaseOrderLinesInputs = {
  connection: connectionInput,
  companyId,
  purchaseOrderId,
  fetchAll,
  odataQueryParams,
};
