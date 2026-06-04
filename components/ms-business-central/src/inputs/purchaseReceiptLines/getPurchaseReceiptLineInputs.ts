import { input, util } from "@prismatic-io/spectral";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput } from "../general";

const purchaseReceiptLineId = input({
  label: "Purchase Receipt Line ID",
  comments: "The unique identifier of the purchase receipt line.",
  placeholder: "00000000-0000-0000-0000-000000000000",
  example: "00000000-0000-0000-0000-000000000000",
  type: "string",
  required: true,
  dataSource: "selectPurchaseReceiptLine",
  clean: util.types.toString,
});

export const getPurchaseReceiptLineInputs = {
  connection: connectionInput,
  companyId,
  purchaseReceiptLineId,
};
