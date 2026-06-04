import { input, util } from "@prismatic-io/spectral";
import { BOOLEAN_INPUT_MODEL } from "../../constants";
import { cleanBooleanInput, cleanNumberInput, cleanStringInput } from "../../utils";
import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, odataParams } from "../general";


export const purchaseInvoiceId = input({
  label: "Purchase Invoice ID",
  type: "string",
  comments: "The unique identifier of the purchase invoice.",
  required: true,
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  dataSource: "selectPurchaseInvoice",
  clean: util.types.toString,
});

export const vendorId = input({
  label: "Vendor ID",
  type: "string",
  comments: "The unique identifier of the vendor for this invoice.",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  required: false,
  dataSource: "selectVendor",
  clean: cleanStringInput,
});

export const vendorNumber = input({
  label: "Vendor Number",
  type: "string",
  comments: "Specifies the vendor's number.",
  example: "20000",
  placeholder: "20000",
  required: true,
  clean: util.types.toString,
});

export const invoiceDate = input({
  label: "Invoice Date",
  type: "string",
  comments: "The date of the invoice.",
  example: "2024-01-15",
  placeholder: "YYYY-MM-DD",
  required: false,
  clean: cleanStringInput,
});

export const postingDate = input({
  label: "Posting Date",
  type: "string",
  comments: "The posting date of the invoice.",
  example: "2024-01-15",
  placeholder: "YYYY-MM-DD",
  required: false,
  clean: cleanStringInput,
});

export const dueDate = input({
  label: "Due Date",
  type: "string",
  comments: "The due date of the invoice.",
  example: "2024-02-15",
  placeholder: "YYYY-MM-DD",
  required: false,
  clean: cleanStringInput,
});

export const vendorInvoiceNumber = input({
  label: "Vendor Invoice Number",
  type: "string",
  comments: "The vendor's invoice number.",
  example: "INV-001",
  placeholder: "INV-001",
  required: false,
  clean: cleanStringInput,
});

export const payToVendorId = input({
  label: "Pay To Vendor ID",
  type: "string",
  comments: "The unique identifier of the vendor to pay to.",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  required: false,
  dataSource: "selectVendor",
  clean: cleanStringInput,
});

export const payToVendorNumber = input({
  label: "Pay To Vendor Number",
  type: "string",
  comments: "Specifies the number of the vendor to pay to.",
  example: "20000",
  placeholder: "20000",
  required: false,
  clean: cleanStringInput,
});

export const shipToName = input({
  label: "Ship To Name",
  type: "string",
  comments: "The name for the ship-to address.",
  example: "My Company",
  placeholder: "My Company",
  required: false,
  clean: cleanStringInput,
});

export const shipToContact = input({
  label: "Ship To Contact",
  type: "string",
  comments: "The contact name for the ship-to address.",
  example: "John Doe",
  placeholder: "John Doe",
  required: false,
  clean: cleanStringInput,
});

export const buyFromAddressLine1 = input({
  label: "Buy From Address Line 1",
  type: "string",
  comments: "The first line of the buy-from address.",
  example: "100 Day Drive",
  placeholder: "100 Day Drive",
  required: false,
  clean: cleanStringInput,
});

export const buyFromAddressLine2 = input({
  label: "Buy From Address Line 2",
  type: "string",
  comments: "The second line of the buy-from address.",
  required: false,
  example: "Suite 200",
  placeholder: "Enter address line 2",
  clean: cleanStringInput,
});

export const buyFromCity = input({
  label: "Buy From City",
  type: "string",
  comments: "The city of the buy-from address.",
  example: "Chicago",
  placeholder: "Chicago",
  required: false,
  clean: cleanStringInput,
});

export const buyFromState = input({
  label: "Buy From State",
  type: "string",
  comments: "The state of the buy-from address.",
  example: "IL",
  placeholder: "IL",
  required: false,
  clean: cleanStringInput,
});

export const buyFromCountry = input({
  label: "Buy From Country",
  type: "string",
  comments: "The country of the buy-from address.",
  example: "US",
  placeholder: "US",
  required: false,
  clean: cleanStringInput,
});

export const buyFromPostCode = input({
  label: "Buy From Post Code",
  type: "string",
  comments: "The postal code of the buy-from address.",
  example: "61236",
  placeholder: "61236",
  required: false,
  clean: cleanStringInput,
});

export const currencyId = input({
  label: "Currency ID",
  type: "string",
  comments: "The unique identifier of the currency.",
  example: "00000000-0000-0000-0000-000000000000",
  placeholder: "00000000-0000-0000-0000-000000000000",
  required: false,
  clean: cleanStringInput,
});

export const currencyCode = input({
  label: "Currency Code",
  type: "string",
  comments: "The currency code.",
  example: "USD",
  placeholder: "USD",
  required: false,
  clean: cleanStringInput,
});

export const pricesIncludeTax = input({
  label: "Prices Include Tax",
  type: "boolean",
  comments: "Specifies if prices include tax.",
  required: false,
  clean: util.types.toBool,
});

export const discountAmount = input({
  label: "Discount Amount",
  type: "string",
  comments: "The discount amount for the invoice.",
  example: "0",
  placeholder: "0",
  required: false,
  clean: cleanNumberInput,
});


export const listPurchaseInvoicesInputs = {
  connection: connectionInput,
  companyId,
  ...odataParams,
};

export const getPurchaseInvoiceInputs = {
  connection: connectionInput,
  companyId,
  purchaseInvoiceId,
};

export const createPurchaseInvoiceInputs = {
  connection: connectionInput,
  companyId: {
    ...companyId,
    comments: "The ID of the company you want to create the purchase invoice in.",
  },
  vendorNumber,
  vendorId,
  invoiceDate,
  postingDate,
  dueDate,
  vendorInvoiceNumber,
  payToVendorId,
  payToVendorNumber,
  shipToName,
  shipToContact,
  buyFromAddressLine1,
  buyFromAddressLine2,
  buyFromCity,
  buyFromState,
  buyFromCountry,
  buyFromPostCode,
  currencyId,
  currencyCode,
  pricesIncludeTax,
  discountAmount,
};

export const updatePurchaseInvoiceInputs = {
  connection: connectionInput,
  companyId: {
    ...companyId,
    comments: "The ID of the company to which the purchase invoice belongs.",
  },
  purchaseInvoiceId,
  vendorId,
  vendorNumber: { ...vendorNumber, required: false, clean: cleanStringInput },
  invoiceDate,
  postingDate,
  dueDate,
  vendorInvoiceNumber,
  payToVendorId,
  payToVendorNumber,
  shipToName,
  shipToContact,
  buyFromAddressLine1,
  buyFromAddressLine2,
  buyFromCity,
  buyFromState,
  buyFromCountry,
  buyFromPostCode,
  currencyId,
  currencyCode,
  pricesIncludeTax: {
    ...pricesIncludeTax,
    required: false,
    clean: cleanBooleanInput,
    type: "string" as const,
    model: BOOLEAN_INPUT_MODEL,
  },
  discountAmount,
};

export const deletePurchaseInvoiceInputs = {
  connection: connectionInput,
  companyId,
  purchaseInvoiceId,
};

export const postPurchaseInvoiceInputs = {
  connection: connectionInput,
  companyId,
  purchaseInvoiceId,
};
