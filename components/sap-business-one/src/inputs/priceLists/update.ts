import { cleanString } from "../../util";
import { bodyFields } from "../general";
import { priceListNo, priceListName } from "./general";

export const updatePriceListsInputs = {
  PriceListNo: priceListNo,
  PriceListName: { ...priceListName, required: false, clean: cleanString },
  bodyFields,
};
