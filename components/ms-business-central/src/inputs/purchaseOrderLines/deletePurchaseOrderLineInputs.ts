import { input } from "@prismatic-io/spectral";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput } from "../general";
import { purchaseOrderLineId } from "./shared";

export const deletePurchaseOrderLineInputs = {
  connection: connectionInput,
  companyId,
  purchaseOrderLineId: input({
    ...purchaseOrderLineId,
    comments: "The unique ID of the purchase order line to delete.",
  }),
};
