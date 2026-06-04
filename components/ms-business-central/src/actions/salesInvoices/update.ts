import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createSalesInvoiceExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { customerId } from "../../inputs/customers/getCustomerInputs";
import { additionalProperties, connectionInput } from "../../inputs/general";
import {
  billToCustomerId,
  currencyCode,
  customerNumber,
  email,
  sellToAddressLine1,
  shipToAddressLine1,
  shipToName,
} from "../../inputs/salesInvoice/createSalesInvoicesInputs";
import { salesInvoiceId } from "../../inputs/salesInvoice/updateSalesInvoiceInputs";
import type { SalesInvoice } from "../../interfaces";
import { cleanStringInput } from "../../utils";

export const updateSalesInvoice = action({
  display: {
    label: "Update Sales Invoice",
    description: "Updates a sales invoice object in your Business Central organization.",
  },
  perform: async (
    context,
    {
      additionalProperties,

      email,
      sellToAddressLine1,
      shipToAddressLine1,
      shipToName,
      customerNumber,
      billToCustomerId,
      currencyCode,
      customerId,
      companyId,
      connection,
      salesInvoiceId,
    },
  ) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const payload = {
      ...additionalProperties,
      email,
      sellToAddressLine1,
      shipToAddressLine1,
      shipToName,
      customerNumber,
      billToCustomerId,
      currencyCode,
      customerId,
    };

    const { data } = await client.patch<SalesInvoice>(
      `/companies(${companyId})/salesInvoices(${salesInvoiceId})`,
      payload,
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
    companyId,
    salesInvoiceId,
    customerId: {
      ...customerId,
      required: false,
      clean: cleanStringInput,
    },
    customerNumber,
    billToCustomerId,
    shipToName,
    sellToAddressLine1,
    shipToAddressLine1,
    currencyCode,
    email,
    additionalProperties: {
      ...additionalProperties,
      example: JSON.stringify({
        invoiceDate: "2024-03-02",
        postingDate: "2024-03-02",
        salesperson: "PS",
        phoneNumber: "555-555-5555",
      }),
    },
  },
  examplePayload: createSalesInvoiceExamplePayload,
});
