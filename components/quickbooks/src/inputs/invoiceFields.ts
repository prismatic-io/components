import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";



export const billEmail = input({
  label: "Bill Email",
  placeholder: "Enter billing email address",
  type: "string",
  required: false,
  example: "customer@example.com",
  comments: "The email address to send the invoice to.",
  clean: cleanStringInput,
});

export const billEmailCc = input({
  label: "Bill Email CC",
  placeholder: "Enter CC email address",
  type: "string",
  required: false,
  example: "accounting@example.com",
  comments: "The CC email address for the invoice.",
  clean: cleanStringInput,
});

export const billEmailBcc = input({
  label: "Bill Email BCC",
  placeholder: "Enter BCC email address",
  type: "string",
  required: false,
  example: "records@example.com",
  comments: "The BCC email address for the invoice.",
  clean: cleanStringInput,
});



export const dueDate = input({
  label: "Due Date",
  placeholder: "Enter due date",
  type: "string",
  required: false,
  example: "2026-04-30",
  comments: "The due date of the invoice in YYYY-MM-DD format.",
  clean: cleanStringInput,
});

export const invoiceDate = input({
  label: "Invoice Date",
  placeholder: "Enter invoice date",
  type: "string",
  required: false,
  example: "2026-03-31",
  comments: "The transaction date of the invoice in YYYY-MM-DD format.",
  clean: cleanStringInput,
});

export const docNumber = input({
  label: "Document Number",
  placeholder: "Enter document number",
  type: "string",
  required: false,
  example: "INV-1001",
  comments: "The reference number for the invoice.",
  clean: cleanStringInput,
});

export const customerMemo = input({
  label: "Customer Memo",
  placeholder: "Enter customer memo",
  type: "string",
  required: false,
  example: "Thank you for your business!",
  comments: "A memo that appears on the invoice sent to the customer.",
  clean: cleanStringInput,
});

export const privateNote = input({
  label: "Private Note",
  placeholder: "Enter private note",
  type: "string",
  required: false,
  example: "Follow up in 30 days",
  comments: "An internal note that is not visible to the customer.",
  clean: cleanStringInput,
});

export const salesTermId = input({
  label: "Sales Term ID",
  placeholder: "Enter sales term ID",
  type: "string",
  required: false,
  example: "3",
  dataSource: "selectTerm",
  comments: "The ID of the sales term (e.g., Net 30) to apply to the invoice.",
  clean: cleanStringInput,
});



export const billingLine1 = input({
  label: "Billing Address Line 1",
  placeholder: "Enter billing address line 1",
  type: "string",
  required: false,
  example: "123 Main Street",
  comments: "Line 1 of the billing address.",
  clean: cleanStringInput,
});

export const billingLine2 = input({
  label: "Billing Address Line 2",
  placeholder: "Enter billing address line 2",
  type: "string",
  required: false,
  example: "Suite 200",
  comments: "Line 2 of the billing address.",
  clean: cleanStringInput,
});

export const billingCity = input({
  label: "Billing City",
  placeholder: "Enter billing city",
  type: "string",
  required: false,
  example: "Mountain View",
  comments: "The city of the billing address.",
  clean: cleanStringInput,
});

export const billingState = input({
  label: "Billing State",
  placeholder: "Enter billing state",
  type: "string",
  required: false,
  example: "CA",
  comments: "The state or province of the billing address.",
  clean: cleanStringInput,
});

export const billingPostalCode = input({
  label: "Billing Postal Code",
  placeholder: "Enter billing postal code",
  type: "string",
  required: false,
  example: "94043",
  comments: "The postal code of the billing address.",
  clean: cleanStringInput,
});



export const shippingLine1 = input({
  label: "Shipping Address Line 1",
  placeholder: "Enter shipping address line 1",
  type: "string",
  required: false,
  example: "456 Oak Avenue",
  comments: "Line 1 of the shipping address.",
  clean: cleanStringInput,
});

export const shippingLine2 = input({
  label: "Shipping Address Line 2",
  placeholder: "Enter shipping address line 2",
  type: "string",
  required: false,
  example: "Building B",
  comments: "Line 2 of the shipping address.",
  clean: cleanStringInput,
});

export const shippingCity = input({
  label: "Shipping City",
  placeholder: "Enter shipping city",
  type: "string",
  required: false,
  example: "Palo Alto",
  comments: "The city of the shipping address.",
  clean: cleanStringInput,
});

export const shippingState = input({
  label: "Shipping State",
  placeholder: "Enter shipping state",
  type: "string",
  required: false,
  example: "CA",
  comments: "The state or province of the shipping address.",
  clean: cleanStringInput,
});

export const shippingPostalCode = input({
  label: "Shipping Postal Code",
  placeholder: "Enter shipping postal code",
  type: "string",
  required: false,
  example: "94301",
  comments: "The postal code of the shipping address.",
  clean: cleanStringInput,
});
