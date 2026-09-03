import { structuredObjectInput } from "@prismatic-io/spectral";
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
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Phone, Notes, Currency Format, Tax Exempt, and Metafields.",
  inputs: { phone, notes, currency, taxExempt, metafields },
});
export const createCustomerInputs = {
  shopifyConnection: connectionInput,
  firstName,
  lastName,
  email,
  addressList,
  verifiedEmail,
  fieldValues,
  tags,
  additionalFields,
};
