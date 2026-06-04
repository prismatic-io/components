import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
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
  taxLiable,
  taxRegistrationNumber,
  website,
} from "../../inputs/customers/createCustomerInputs";
import { connectionInput } from "../../inputs/general";
import type { Customer } from "../../interfaces";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Creates a customer object in Microsoft Business Central.",
  },
  perform: async (
    context,
    {
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      email,
      website,
      taxLiable,
      taxAreaId,
      taxRegistrationNumber,
      type,
      blocked,

      shipmentMethodId,
      paymentMethodId,
      currencyCode,
      paymentTermsId,
      currencyId,
      displayName,
      connection,
      companyId,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
      phoneNumber,
      email,
      website,
      taxLiable,
      taxAreaId,
      taxRegistrationNumber,
      type,
      blocked,
      shipmentMethodId,
      paymentMethodId,
      currencyCode,
      paymentTermsId,
      currencyId,
      displayName,
    };
    const { data } = await client.post<Customer>(`/companies(${companyId})/customers`, payload);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    companyId: {
      ...companyId,
      comments: "The ID of the company you want to create the customer in.",
    },
    displayName,
    type: customerType,
    addressLine1,
    addressLine2,
    city,
    state,
    country,
    postalCode,
    phoneNumber,
    email,
    website,
    taxLiable,
    taxAreaId,
    taxRegistrationNumber,
    currencyId,
    currencyCode,
    paymentTermsId,
    shipmentMethodId,
    paymentMethodId,
    blocked,
  },
  examplePayload: createCustomerExamplePayload,
});
