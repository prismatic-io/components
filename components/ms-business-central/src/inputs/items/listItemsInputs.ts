import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataQueryParams } from "../general";
export const listItemsInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  odataQueryParams,
};
