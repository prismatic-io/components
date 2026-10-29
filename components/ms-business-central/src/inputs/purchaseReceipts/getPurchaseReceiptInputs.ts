import { input, util } from "@prismatic-io/spectral";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput } from "../general";

const purchaseReceiptId = input({
  label: "Purchase Receipt ID",
  comments: "The unique identifier of the purchase receipt.",
  placeholder: "00000000-0000-0000-0000-000000000000",
  example: "00000000-0000-0000-0000-000000000000",
  type: "string",
  required: true,
  dataSource: "selectPurchaseReceipt",
  clean: util.types.toString,
});

export const getPurchaseReceiptInputs = {
  connection: connectionInput,
  companyId,
  purchaseReceiptId,
};
