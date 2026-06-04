import { cleanString } from "../../util";
import { bodyFields } from "../general";
import { cardCode, cardName, cardType } from "./general";

export const updateBusinessPartnersInputs = {
  CardCode: cardCode,
  CardName: { ...cardName, required: false, clean: cleanString },
  CardType: { ...cardType, required: false, clean: cleanString },
  bodyFields,
};
