import { AD_ACCOUNT_DEFAULTS } from "../constants";
import {
  adAccountId,
  fetchAll,
  fields,
  myConnectionField,
  pagination,
  version,
} from "./common";
export const getAdAccountInputs = {
  connection: myConnectionField,
  adAccountId,
  fields: {
    ...fields,
    default: AD_ACCOUNT_DEFAULTS,
  },
  version,
};
export const listAdAccountsInputs = {
  connection: myConnectionField,
  fetchAll,
  pagination,
  fields: {
    ...fields,
    default: AD_ACCOUNT_DEFAULTS,
  },
  version,
};
