import { input } from "@prismatic-io/spectral";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput } from "../general";
import { purchaseOrderId } from "./shared";

export const getPurchaseOrderInputs = {
  connection: connectionInput,
  companyId,
  purchaseOrderId: input({
    ...purchaseOrderId,
    comments: "The unique ID of the purchase order to retrieve.",
  }),
};
