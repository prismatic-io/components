import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataQueryParams } from "../general";
export const listPurchaseOrdersInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  odataQueryParams,
};
