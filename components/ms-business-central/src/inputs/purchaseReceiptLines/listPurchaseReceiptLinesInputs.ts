import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";

export const listPurchaseReceiptLinesInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};
