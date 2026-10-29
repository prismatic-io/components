import { bodyFields } from "../general";
import { cardCode, docDueDate, docLines } from "./general";

export const createOrderInputs = {
  CardCode: cardCode,
  DocDueDate: docDueDate,
  DocumentLines: docLines,
  bodyFields,
};
