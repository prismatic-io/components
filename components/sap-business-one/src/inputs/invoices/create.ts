import { cardCode } from "../businessPartners/general";
import { bodyFields } from "../general";
import { docLines } from "../orders/general";

export const createInvoiceInputs = {
  CardCode: cardCode,
  DocumentLines: docLines,
  bodyFields,
};
