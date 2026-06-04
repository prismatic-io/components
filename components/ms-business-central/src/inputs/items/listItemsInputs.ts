import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";

export const listItemsInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};
