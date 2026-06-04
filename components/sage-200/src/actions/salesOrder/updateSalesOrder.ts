import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import updateSalesOrderInputs from "../../inputs/salesOrder/updateSalesOrderInputs";
import { updateSalesOrderPayload } from "../../examplePayloads";

export const updateSalesOrder = action({
  display: {
    label: "Update Sales Order",
    description: "Edit an existing sales Order by ID",
  },
  perform: async (
    context,
    {
      connection,
      site,
      company,
      salesOrderId,
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
    const { data } = await client.put(`/sop_orders/${salesOrderId}`, payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...updateSalesOrderInputs,
  },
  examplePayload: updateSalesOrderPayload,
});
