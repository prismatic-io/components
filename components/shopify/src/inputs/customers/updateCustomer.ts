import { connectionInput, customerId, fieldValues, tags } from "../common";
import {
  addressList,
  currency,
  metafields,
  notes,
  phone,
  taxExempt,
  updateEmail,
  updateFirstName,
  updateLastName,
  verifiedEmail,
} from "./common";

export const updateCustomerInputs = {
  shopifyConnection: connectionInput,
  customerId,
  updateEmail,
  updateFirstName,
  updateLastName,
  phone,
  verifiedEmail,
  notes,
  fieldValues,
  currency,
  tags,
  taxExempt,
  metafields,
  addressList,
};
