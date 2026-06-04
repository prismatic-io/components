import { cleanStringInput } from "../../utils";
import {
  addressLine1,
  addressLine2,
  blocked,
  city,
  country,
  currencyCode,
  currencyId,
  customerType,
  displayName,
  email,
  paymentMethodId,
  paymentTermsId,
  phoneNumber,
  postalCode,
  shipmentMethodId,
  state,
  taxAreaId,
  taxRegistrationNumber,
  website,
} from "./createCustomerInputs";

export default {
  displayName: {
    ...displayName,
    required: false,
    clean: cleanStringInput,
  },
  customerType: {
    ...customerType,
    required: false,
    clean: cleanStringInput,
  },
  addressLine1: {
    ...addressLine1,
    required: false,
    clean: cleanStringInput,
  },
  addressLine2,
  city: {
    ...city,
    required: false,
    clean: cleanStringInput,
  },
  state: {
    ...state,
    required: false,
    clean: cleanStringInput,
  },
  country: {
    ...country,
    required: false,
    clean: cleanStringInput,
  },
  postalCode: {
    ...postalCode,
    required: false,
    clean: cleanStringInput,
  },
  phoneNumber,
  email: {
    ...email,
    required: false,
    clean: cleanStringInput,
  },
  website,
  taxAreaId: {
    ...taxAreaId,
    required: false,
    clean: cleanStringInput,
  },
  taxRegistrationNumber: {
    ...taxRegistrationNumber,
    required: false,
    clean: cleanStringInput,
  },
  currencyId: {
    ...currencyId,
    required: false,
    clean: cleanStringInput,
  },
  currencyCode: {
    ...currencyCode,
    required: false,
    clean: cleanStringInput,
  },
  paymentTermsId: {
    ...paymentTermsId,
    required: false,
    clean: cleanStringInput,
  },
  shipmentMethodId: {
    ...shipmentMethodId,
    required: false,
    clean: cleanStringInput,
  },
  paymentMethodId: {
    ...paymentMethodId,
    required: false,
    clean: cleanStringInput,
  },
  blocked: {
    ...blocked,
    required: false,
    clean: cleanStringInput,
  },
};
