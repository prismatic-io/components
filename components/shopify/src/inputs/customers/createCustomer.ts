import { connectionInput, fieldValues, tags } from "../common";
import {
  addressList,
  currency,
  email,
  firstName,
  lastName,
  metafields,
  notes,
  phone,
  taxExempt,
  verifiedEmail,
} from "./common";

export const createCustomerInputs = {
  shopifyConnection: connectionInput,
  firstName,
  lastName,
  email,
  phone,
  notes,
  verifiedEmail,
  addressList,
  fieldValues,
  currency,
  tags,
  taxExempt,
  metafields,
};
