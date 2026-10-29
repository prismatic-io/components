import { bodyFields } from "../general";
import { comments } from "../orders/update";
import { docEntry } from "./general";

export const updatePurchaseOrderInputs = {
  docEntry,
  Comments: comments,
  bodyFields,
};
