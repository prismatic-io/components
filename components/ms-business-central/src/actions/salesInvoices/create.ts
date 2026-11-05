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
import type { SalesInvoice } from "../../interfaces";

export const createSalesInvoice = action({
  display: {
    label: "Create Sales Invoice",
    description: "Creates a sales invoice object in your Business Central organization.",
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

    const { data } = await client.post<SalesInvoice>(
      `/companies(${companyId})/salesInvoices`,
      payload,
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    customerId,
    customerNumber,
    billToCustomerId,
    shipToName,
    sellToAddressLine1,
    shipToAddressLine1,
    currencyCode,
    email,
    additionalProperties: {
      ...additionalProperties,
      example: JSON.stringify(
        {
          invoiceDate: "2024-03-02",
          postingDate: "2024-03-02",
          salesperson: "PS",
          phoneNumber: "555-555-5555",
        },
        null,
        2,
      ),
    },
  },
  examplePayload: createSalesInvoiceExamplePayload,
});
