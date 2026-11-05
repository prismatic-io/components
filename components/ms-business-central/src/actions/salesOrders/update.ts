import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createSalesOrderExamplePayload } from "../../examplePayloads";
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
} from "../../inputs/salesOrders/createSalesOrderInputs";
import { salesOrderId } from "../../inputs/salesOrders/updateSalesOrderInputs";
import type { SalesOrder } from "../../interfaces";
import { cleanStringInput } from "../../utils";

export const updateSalesOrder = action({
  display: {
    label: "Update Sales Order",
    description: "Updates a sales order object in your Business Central organization.",
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
      salesOrderId,
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

    const { data } = await client.patch<SalesOrder>(
      `/companies(${companyId})/salesOrders(${salesOrderId})`,
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
    salesOrderId,
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
        orderDate: "2024-03-02",
        postingDate: "2024-03-02",
        pricesIncludeTax: false,
      }),
    },
  },
  examplePayload: createSalesOrderExamplePayload,
});
