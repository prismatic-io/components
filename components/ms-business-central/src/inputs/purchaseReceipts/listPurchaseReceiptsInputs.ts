import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataQueryParams } from "../general";
export const listPurchaseReceiptsInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  odataQueryParams,
};
