import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  activeInput,
  attachmentsIdInput,
  billToContactNameInput,
  commentsInput,
  companyNameInput,
  connection,
  contactDetailsWithCountryCode,
  creditLimitInput,
  customFieldsInput,
  customerIdInput,
  defaultCurrencyInput,
  excludedFromContactListInput,
  fieldsInput,
  glGroupNameInput,
  name,
  onHoldInput,
  primaryContactNameInput,
  printAsInput,
  recordNoInput,
  restrictedDepartmentsInput,
  restrictedLocationsInput,
  restrictionTypeInput,
  shipToContactNameInput,
  taxInfo,
  paymentTermInput,
} from "./common";
const customerNameInput = input({
  label: "Customer Name",
  type: "string",
  comments: "The display name of the customer in Sage Intacct.",
  required: true,
  example: "Global Tech Solutions",
  placeholder: "Enter customer name",
  clean: util.types.toString,
});
const oneTimeCustomerInput = input({
  label: "One Time",
  comments:
    "One time. Use false for No, true for Yes. If you want to simplify your customer list page by displaying only your regularly-used customers, we recommend you select this option for customers that you use only once or just occasionally. These customers will not appear in the customer list page unless you click Include one-time use at the top of the list page, in which case, you'll see all your customers regardless of frequency of use.",
  type: "string",
  required: false,
  clean: util.types.toString,
  default: "",
  model: [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
    {
      label: "Empty",
      value: "",
    },
  ],
});
const customerTypeIdInput = input({
  label: "Customer Type ID",
  type: "string",
  comments: "Identifier for the type of customer",
  required: false,
  example: "TYPE-001",
  placeholder: "Enter customer type ID",
  clean: util.types.toString,
});
const salesRepEmployeeIdInput = input({
  label: "Sales Rep Employee ID",
  type: "string",
  comments: "Employee ID of the sales representative",
  required: false,
  example: "EMP-001",
  placeholder: "Enter employee ID",
  clean: util.types.toString,
});
const parentCustomerIdInput = input({
  label: "Parent Customer ID",
  type: "string",
  comments: "Identifier of the parent customer",
  required: false,
  example: "CUST-PARENT-001",
  placeholder: "Enter parent customer ID",
  clean: util.types.toString,
});
const territoryIdInput = input({
  label: "Territory ID",
  type: "string",
  comments: "Identifier for the territory",
  required: false,
  example: "TERR-001",
  placeholder: "Enter territory ID",
  clean: util.types.toString,
});
const offsetArGlAccountNoInput = input({
  label: "Offset AR GL Account No",
  type: "string",
  comments: "Offset AR GL account number",
  required: false,
  example: "1200",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
});
const defaultRevenueGlAccountNoInput = input({
  label: "Default Revenue GL Account No",
  type: "string",
  comments: "Default AR GL account number",
  required: false,
  example: "4000",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
});
const shippingMethodInput = input({
  label: "Shipping Method",
  type: "string",
  comments: "The method used for shipping goods, such as FedEx Ground or UPS.",
  required: false,
  example: "FedEx Ground",
  placeholder: "Enter shipping method",
  clean: util.types.toString,
});
const resaleNumberInput = input({
  label: "Resale Number",
  type: "string",
  comments: "Resale certificate number for tax-exempt purchases",
  required: false,
  example: "RSL-123456",
  placeholder: "Enter resale number",
  clean: util.types.toString,
});
const deliveryMethodInput = input({
  label: "Delivery Method",
  type: "string",
  comments:
    "Delivery method. Use either Print, E-Mail, or Print#~#E-Mail for both. If using E-Mail, the customer contact must have a valid e-mail address.",
  required: false,
  clean: util.types.toString,
});
const defaultInvoiceMessageInput = input({
  label: "Default Invoice Message",
  type: "string",
  comments: "Default message for invoices",
  required: false,
  clean: util.types.toString,
});
const printOptionArInvoiceTemplateNameInput = input({
  label: "AR Invoice Template Name",
  type: "string",
  comments: "Template name for AR invoices",
  required: false,
  clean: util.types.toString,
});
const printOptionOeQuoteTemplateNameInput = input({
  label: "OE Quote Template Name",
  type: "string",
  comments: "Template name for OE quotes",
  required: false,
  clean: util.types.toString,
});
const printOptionOeOrderTemplateNameInput = input({
  label: "OE Order Template Name",
  type: "string",
  comments: "Template name for OE orders",
  required: false,
  clean: util.types.toString,
});
const printOptionOeListTemplateNameInput = input({
  label: "OE List Template Name",
  type: "string",
  comments: "Template name for OE lists",
  required: false,
  clean: util.types.toString,
});
const printOptionOeInvoiceTemplateNameInput = input({
  label: "OE Invoice Template Name",
  type: "string",
  comments: "Template name for OE invoices",
  required: false,
  clean: util.types.toString,
});
const printOptionOeAdjustmentTemplateNameInput = input({
  label: "OE Adjustment Template Name",
  type: "string",
  comments: "Template name for OE adjustments",
  required: false,
  clean: util.types.toString,
});
const printOptionOeOtherTemplateNameInput = input({
  label: "OE Other Template Name",
  type: "string",
  comments: "Template name for other OE documents",
  required: false,
  clean: util.types.toString,
});
export const printOptions = structuredObjectInput({
  label: "Print Options",
  required: false,
  comments:
    "Document template assignments for invoices, quotes, orders, and adjustments.",
  inputs: {
    printOptionArInvoiceTemplateNameInput,
    printOptionOeQuoteTemplateNameInput,
    printOptionOeOrderTemplateNameInput,
    printOptionOeListTemplateNameInput,
    printOptionOeInvoiceTemplateNameInput,
    printOptionOeAdjustmentTemplateNameInput,
    printOptionOeOtherTemplateNameInput,
  },
});
export const customerContactRoles = structuredObjectInput({
  label: "Contact Roles",
  required: false,
  comments: "Primary, bill-to, and ship-to contact assignments.",
  inputs: {
    primaryContactNameInput,
    billToContactNameInput,
    shipToContactNameInput,
  },
});
export const customerGlAccounts = structuredObjectInput({
  label: "GL Accounts",
  required: false,
  comments:
    "GL group, offset AR GL account, and default revenue GL account numbers.",
  inputs: {
    glGroupNameInput,
    offsetArGlAccountNoInput,
    defaultRevenueGlAccountNoInput,
  },
});
export const billingPreferences = structuredObjectInput({
  label: "Billing and Delivery Preferences",
  required: false,
  comments:
    "Payment term, delivery method, default invoice message, and shipping method.",
  inputs: {
    paymentTermInput,
    deliveryMethodInput,
    defaultInvoiceMessageInput,
    shippingMethodInput,
  },
});
export const createCustomerInputs = {
  connection,
  customerIdInput,
  customerNameInput,
  oneTimeInput: oneTimeCustomerInput,
  activeInput,
  companyNameInput,
  printAsInput,
  name,
  contactDetails: contactDetailsWithCountryCode,
  excludedFromContactListInput,
  customerTypeIdInput,
  salesRepEmployeeIdInput,
  parentCustomerIdInput,
  glAccounts: customerGlAccounts,
  territoryIdInput,
  attachmentsIdInput,
  billingPreferences,
  resaleNumberInput,
  taxInfo,
  creditLimitInput,
  onHoldInput,
  commentsInput,
  defaultCurrencyInput,
  printOptions,
  customerContactRoles,
  restrictionTypeInput,
  restrictedLocationsInput,
  restrictedDepartmentsInput,
  customFieldsInput,
};
export const getCustomerInputs = {
  connection,
  fieldsInput,
  recordNoInput: { ...recordNoInput, dataSource: "selectCustomer" },
};
export const updateCustomerInputs = {
  connection,
  customerIdInput: {
    ...customerIdInput,
    required: true,
    dataSource: "selectCustomer",
  },
  customerNameInput: { ...customerNameInput, required: false },
  oneTimeInput: oneTimeCustomerInput,
  activeInput,
  companyNameInput,
  printAsInput,
  name,
  contactDetails: contactDetailsWithCountryCode,
  excludedFromContactListInput,
  customerTypeIdInput,
  salesRepEmployeeIdInput,
  parentCustomerIdInput,
  glAccounts: customerGlAccounts,
  territoryIdInput,
  attachmentsIdInput,
  billingPreferences,
  resaleNumberInput,
  taxInfo,
  creditLimitInput,
  onHoldInput,
  commentsInput,
  defaultCurrencyInput,
  printOptions,
  customerContactRoles,
  restrictionTypeInput,
  restrictedLocationsInput,
  restrictedDepartmentsInput,
  customFieldsInput,
};
