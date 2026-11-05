import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { BOOLEAN_INPUT_MODEL } from "../../constants";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { taxLiable } from "../../inputs/customers/createCustomerInputs";
import { customerId } from "../../inputs/customers/getCustomerInputs";
import updateCustomerInputs from "../../inputs/customers/updateCustomerInputs";
import { connectionInput } from "../../inputs/general";
import type { Customer } from "../../interfaces";
import { cleanBooleanInput } from "../../utils";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update a customer object in your Business Central organization.",
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
      customerId,
      companyId,

      connection,
      displayName,
      currencyCode,
      paymentTermsId,
      currencyId,
      paymentMethodId,
      blocked,
      shipmentMethodId,
      customerType,
      taxRegistrationNumber,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const { data } = await client.patch<Customer>(
      `/companies(${companyId})/customers(${customerId})`,
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
        displayName,
        currencyCode,
        paymentTermsId,
        currencyId,
        paymentMethodId,
        blocked,
        shipmentMethodId,
        type: customerType,
        taxRegistrationNumber,
      },
      {
        headers: {
          "If-Match": "*",
        },
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,

    companyId: {
      ...companyId,
      comments: "The ID of the company to which the customer belongs.",
    },
    customerId,
    ...updateCustomerInputs,
    taxLiable: {
      ...taxLiable,
      required: false,
      clean: cleanBooleanInput,
      type: "string",
      model: BOOLEAN_INPUT_MODEL,
    },
  },
  examplePayload: createCustomerExamplePayload,
});
