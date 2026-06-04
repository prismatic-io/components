import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput, cleanStringInput } from "../../util";

const customerId = input({
  label: "Customer ID",
  comments:
    "Customer record ID to record a sale against. See [Sage 200 API documentation](https://developer.sage.com/200/reference/customers) for more information.",
  type: "string",
  required: true,
  placeholder: "27825",
  example: "27825",
  dataSource: "selectCustomer",
  clean: cleanNumberInput,
});

const transactionDate = input({
  label: "Transaction Date",
  comments: "Transaction date. This defaults to the current system date.",
  type: "string",
  required: false,
  placeholder: "2023-01-02T00:00:00Z",
  example: "2023-01-02T00:00:00Z",
  clean: cleanStringInput,
});

const dueDate = input({
  label: "Due Date",
  comments: "Date the invoice is due to be paid.",
  type: "string",
  required: false,
  placeholder: "2023-01-02T00:00:00Z",
  example: "2023-01-02T00:00:00Z",
  clean: cleanStringInput,
});

const exchangeRate = input({
  label: "Exchange Rate",
  comments: "Exchange rate for the invoice. This defaults to the customer exchange rate.",
  type: "string",
  required: false,
  placeholder: "ExchangeRateSingle",
  example: "ExchangeRateSingle",
  clean: cleanNumberInput,
});

const reference = input({
  label: "Reference",
  comments: "Invoice reference.",
  type: "string",
  required: false,
  placeholder: "ABCDE",
  example: "ABCDE",
  clean: cleanStringInput,
});

const secondReference = input({
  label: "Second Reference",
  comments: "Invoice second reference.",
  type: "string",
  required: false,
  placeholder: "FGHIJ",
  example: "FGHIJ",
  clean: cleanStringInput,
});

const settledImmediately = input({
  label: "Settled Immediately",
  comments:
    "When set to True this indicates that the invoice has been paid and any settlement discount has been applied.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const documentGoodsValue = input({
  label: "Document Goods Value",
  comments: "Value of goods.",
  type: "string",
  required: false,
  placeholder: "10.00",
  example: "10.00",
  clean: cleanNumberInput,
});

const documentTaxValue = input({
  label: "Document Tax Value",
  comments: "Tax value.",
  type: "string",
  required: false,
  placeholder: "2.00",
  example: "2.00",
  clean: cleanNumberInput,
});

const documentDiscountValue = input({
  label: "Document Discount Value",
  comments: "Discount value.",
  type: "string",
  required: false,
  placeholder: "4.00",
  example: "4.00",
  clean: cleanNumberInput,
});

const documentTaxDiscountValue = input({
  label: "Document Tax Discount Value",
  comments: "Amount VAT is discounted when a settlement discount is applied.",
  type: "string",
  required: false,
  placeholder: "5.00",
  example: "5.00",
  clean: cleanNumberInput,
});

const discountPercent = input({
  label: "Discount Percent",
  comments:
    "Percentage discount. This defaults to the settlement discount from the customer record.",
  type: "string",
  required: false,
  placeholder: "15.00",
  example: "15.00",
  clean: cleanNumberInput,
});

const discountDays = input({
  label: "Discount Days",
  comments:
    "Number of days to pay to qualify for the settlement discount. This defaults to the settlement days from the customer record.",
  type: "string",
  required: false,
  placeholder: "",
  example: "3",
  clean: cleanNumberInput,
});

const triangularTransaction = input({
  label: "Triangular Transaction",
  comments: "Indicates whether the transaction is triangluted.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const taxAnalysisItems = input({
  label: "Tax Analysis Items",
  comments:
    "Tax analysis lines. See [Sage 200 API documentation](https://developer.sage.com/200/reference/sales_invoices_tax_analysis_items) for more information.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify([{ id: 1, goods_amount: 12.15 }], null, 2),
  clean: cleanCodeInput,
});

const nominalAnalysisItems = input({
  label: "Nominal Analysis Items",
  comments:
    "Nominal analysis lines. See [Sage 200 API documentation](https://developer.sage.com/200/reference/sales_invoices_nominal_analysis_items) for more information.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify([{ code: "123", narrative: "Example narrative" }], null, 2),
  clean: cleanCodeInput,
});

export default {
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
};
