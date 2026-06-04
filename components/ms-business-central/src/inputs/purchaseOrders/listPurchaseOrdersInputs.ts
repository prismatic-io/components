import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";

export const listPurchaseOrdersInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};
