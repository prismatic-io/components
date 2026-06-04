import { cardCode } from "../businessPartners/general";
import { bodyFields } from "../general";
import { docLines } from "../orders/general";

export const createPurchaseOrdersInputs = {
  CardCode: cardCode,
  DocumentLines: { ...docLines, label: "Document Lines" },
  bodyFields,
};
