import { INPUT_SETTINGS_TYPES } from "../constants";
import { connectionInput, domain, type } from "./common";

export const listCardsDataSourceInputs = {
  connectionInput,
  type: {
    ...type,
    default: INPUT_SETTINGS_TYPES.DOMAIN_CARD_LIST,
    comments: "Specifies to the job that it has to list the Cards of a domain.",
  },
  domain: {
    ...domain,
    default: "domain",
    comments: "The name of the domain to list the Cards for.",
  },
};

export const listPoliciesDataSourceInputs = {
  connectionInput,
  type,
};
