import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import createSalesInvoiceInputs from "../../inputs/salesInvoice/createSalesInvoiceInputs";
import { createSalesInvoicePayload } from "../../examplePayloads";

export const createSalesInvoice = action({
  display: {
    label: "Create Sales Invoice",
    description:
      "Create a new sales invoice. Note: Posting a sales invoice does not actually create a 'sales invoice' entity, but a Posted Transaction of type 'TradingAccountEntryTypeInvoice', therefore it is not possible to 'get' a sales invoice using the same API endpoint after it has been posted.",
  },
  perform: async (
    context,
    {
      connection,
      site,
      company,
      customerId,
      transactionDate,
      dueDate,
      exchangeRate,
      reference,
      secondReference,
      settledImmediately,
      documentGoodsValue,
      documentTaxValue,
      documentDiscountValue,
      documentTaxDiscountValue,
      discountPercent,
      discountDays,
      triangularTransaction,
      taxAnalysisItems,
      nominalAnalysisItems,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const payload = {
      customer_id: customerId,
      transaction_date: transactionDate,
      due_date: dueDate,
      exchange_rate: exchangeRate,
      reference,
      second_reference: secondReference,
      settled_immediately: settledImmediately,
      document_goods_value: documentGoodsValue,
      document_tax_value: documentTaxValue,
      document_discount_value: documentDiscountValue,
      document_tax_discount_value: documentTaxDiscountValue,
      discount_percent: discountPercent,
      discount_days: discountDays,
      triangular_transaction: triangularTransaction,
      tax_analysis_items: taxAnalysisItems,
      nominal_analysis_items: nominalAnalysisItems,
    };
    const { data } = await client.post("/sales_invoices", payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...createSalesInvoiceInputs,
  },
  examplePayload: createSalesInvoicePayload,
});
