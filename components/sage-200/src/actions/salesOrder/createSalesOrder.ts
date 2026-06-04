import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import createSalesOrderInputs from "../../inputs/salesOrder/createSalesOrderInputs";
import { createSalesOrderPayload } from "../../examplePayloads";

export const createSalesOrder = action({
  display: {
    label: "Create Sales Order",
    description: "Create a new sales order",
  },
  perform: async (
    context,
    {
      connection,
      site,
      company,
      customerId,
      documentNo,
      isEditing,
      isToSequenceLines,
      overrideOnHold,
      recalculatePrices,
      applyAvailableDocumentDiscountPercent,
      customerDeliveryAddressId,
      suppressWarnings,
      customerType,
      documentDate,
      exchangeRate,
      customerDocumentNo,
      useInvoiceAddress,
      isTriangulated,
      settlementDiscountDays,
      settlementDiscountPercent,
      documentDiscountPercent,
      documentCreatedBy,
      requestedDeliveryDate,
      promisedDeliveryDate,
      quotationExpiryDate,
      orderPriority,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const payload = {
      customer_id: customerId,
      document_no: documentNo,
      is_editing: isEditing,
      is_to_sequence_lines: isToSequenceLines,
      override_on_hold: overrideOnHold,
      recalculate_prices: recalculatePrices,
      apply_available_document_discount_percent:
        applyAvailableDocumentDiscountPercent,
      customer_delivery_address_id: customerDeliveryAddressId,
      suppress_warnings: suppressWarnings,
      customer_type: customerType,
      document_date: documentDate,
      exchange_rate: exchangeRate,
      customer_document_no: customerDocumentNo,
      use_invoice_address: useInvoiceAddress,
      is_triangulated: isTriangulated,
      settlement_discount_days: settlementDiscountDays,
      settlement_discount_percent: settlementDiscountPercent,
      document_discount_percent: documentDiscountPercent,
      document_created_by: documentCreatedBy,
      requested_delivery_date: requestedDeliveryDate,
      promised_delivery_date: promisedDeliveryDate,
      quotation_expiry_date: quotationExpiryDate,
      order_priority: orderPriority,
      ...(additionalFields || {}),
    };
    const { data } = await client.post("/sop_orders", payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...createSalesOrderInputs,
  },
  examplePayload: createSalesOrderPayload,
});
