import { INPUT_SETTINGS_TYPES } from "../constants";
import { connectionInput, domain, type } from "./common";

export const listCardsInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.DOMAIN_CARD_LIST,
    comments: "Specifies to the job that it has to list the cards of a domain.",
  },
  domain,
};
