import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";

export const listPurchaseReceiptsInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};
