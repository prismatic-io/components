import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataQueryParams } from "../general";
export const listPurchaseReceiptLinesInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  odataQueryParams,
};
