import { bodyFields } from "../general";
import { comments } from "../orders/update";
import { invoiceDocumentEntry } from "./general";

export const updateInvoiceInputs = {
  invoiceDocumentEntry,
  Comments: comments,
  bodyFields,
};
