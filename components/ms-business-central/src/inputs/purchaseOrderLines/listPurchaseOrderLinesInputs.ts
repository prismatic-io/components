import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";
import { purchaseOrderId } from "../purchaseOrders/shared";

export const listPurchaseOrderLinesInputs = {
  connection: connectionInput,
  companyId,
  purchaseOrderId,
  ...odataParams,
};
