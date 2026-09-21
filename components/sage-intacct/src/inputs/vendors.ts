import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  activeInput,
  attachmentsIdInput,
  commentsInput,
  companyNameInput,
  connection,
  contactDetailsWithCountryCode,
  creditLimitInput,
  customFieldsInput,
  defaultCurrencyInput,
  excludedFromContactListInput,
  fieldsInput,
  glAccounts,
  name,
  onHoldInput,
  primaryContactNameInput,
  printAsInput,
  recordNoInput,
  restrictedDepartmentsInput,
  restrictedLocationsInput,
  restrictionTypeInput,
  taxInfo,
  vendorIdInput,
  paymentPriorityInput,
  paymentTermInput,
} from "./common";
const vendorNameInput = input({
  label: "Vendor Name",
  type: "string",
  comments: "The display name of the vendor in Sage Intacct.",
  required: true,
  example: "Acme Supplies Inc.",
  placeholder: "Enter vendor name",
  clean: util.types.toString,
});
const vendorTypeIdInput = input({
  label: "Vendor Type ID",
  type: "string",
  comments: "The identifier for the vendor type classification.",
  required: false,
  example: "TYPE-001",
  placeholder: "Enter vendor type ID",
  clean: util.types.toString,
});
const parentVendorIdInput = input({
  label: "Parent Vendor ID",
  type: "string",
  comments: "The ID of the parent vendor for hierarchical relationships.",
  required: false,
  example: "VENDOR-PARENT-001",
  placeholder: "Enter parent vendor ID",
  clean: util.types.toString,
});
const form1099NameInput = input({
  label: "Form 1099 Name",
  type: "string",
  comments: "The name printed on the 1099 form for tax reporting.",
  required: false,
  example: "John Doe",
  placeholder: "Enter 1099 name",
  clean: util.types.toString,
});
const form1099TypeInput = input({
  label: "Form 1099 Type",
  type: "string",
  comments: "The 1099 form type, such as MISC or NEC.",
  required: false,
  example: "MISC",
  placeholder: "Enter 1099 type",
  clean: util.types.toString,
});
const form1099BoxInput = input({
  label: "Form 1099 Box",
  type: "string",
  comments: "The box number on the 1099 form for categorizing income.",
  required: false,
  example: "7",
  placeholder: "Enter box number",
  clean: util.types.toString,
});
const doNotPayInput = input({
  label: "Do Not Pay",
  type: "string",
  comments:
    "When true, the vendor is flagged as do-not-pay and payment processing is blocked.",
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
const payToContactNameInput = input({
  label: "Pay To Contact Name",
  type: "string",
  comments: "The name of the contact designated to receive payments.",
  required: false,
  example: "John Doe",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});
const returnToContactNameInput = input({
  label: "Return To Contact Name",
  type: "string",
  comments: "The name of the contact for handling purchase returns.",
  required: false,
  example: "Jane Smith",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});
const preferredPaymentMethodInput = input({
  label: "Preferred Payment Method",
  type: "string",
  comments:
    "The vendor's preferred payment method, such as Check, EFT, or Credit Card.",
  required: false,
  example: "Check",
  placeholder: "Enter payment method",
  clean: util.types.toString,
});
const sendAutomaticPaymentNotificationInput = input({
  label: "Send Automatic Payment Notification",
  type: "string",
  comments:
    "When true, the vendor receives an automatic email notification when a payment is made.",
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
const mergePaymentRequestsInput = input({
  label: "Merge Payment Requests",
  type: "string",
  comments:
    "When true, multiple payment requests for this vendor are combined into a single payment.",
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
const vendorBillingTypeInput = input({
  label: "Vendor Billing Type",
  type: "string",
  comments:
    "The billing type assigned to the vendor, such as Standard or Retainer.",
  required: false,
  example: "Standard",
  placeholder: "Enter billing type",
  clean: util.types.toString,
});
const termDiscountDisplayedOnCheckStubInput = input({
  label: "Term Discount Displayed On Check Stub",
  type: "string",
  comments:
    "When true, the payment term discount amount is printed on the check stub.",
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
const achEnabledInput = input({
  label: "ACH Enabled",
  type: "string",
  comments: "When true, ACH electronic payments are enabled for this vendor.",
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
const achBankRoutingNoInput = input({
  label: "ACH Bank Routing No",
  type: "string",
  comments: "The 9-digit ABA routing number for the vendor's bank.",
  required: false,
  example: "021000021",
  placeholder: "Enter routing number",
  clean: util.types.toString,
});
const achBankAccountNoInput = input({
  label: "ACH Bank Account No",
  type: "string",
  comments: "The bank account number for ACH payments to the vendor.",
  required: false,
  example: "1234567890",
  placeholder: "Enter account number",
  clean: util.types.toString,
});
const achBankAccountTypeInput = input({
  label: "ACH Bank Account Type",
  type: "string",
  comments: "The bank account type, such as Checking or Savings.",
  required: false,
  example: "Checking",
  placeholder: "Enter account type",
  clean: util.types.toString,
});
const achBankAccountClassInput = input({
  label: "ACH Bank Account Class",
  type: "string",
  comments: "The bank account class, such as Business or Personal.",
  required: false,
  example: "Business",
  placeholder: "Enter account class",
  clean: util.types.toString,
});
const vendorAccountNoInput = input({
  label: "Vendor Account No",
  type: "string",
  comments:
    "The account number assigned by the vendor for reference on payments.",
  required: false,
  example: "VEND-ACC-001",
  placeholder: "Enter vendor account number",
  clean: util.types.toString,
});
const locationAssignedAccountNoDisplayedOnCheckStubInput = input({
  label: "Location Assigned Account No Displayed On Check Stub",
  type: "string",
  comments:
    "When true, the location-specific vendor account number is printed on the check stub.",
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
const oneTimeVendorInput = input({
  label: "One Time",
  comments:
    "One time. Use false for No, true for Yes. If you want to simplify your vendor list page by displaying only your regularly-used vendors, we recommend you select this option for vendors that you use only once or just occasionally. These vendors will not appear in the vendor list page unless you click Include one-time use at the top of the list page, in which case, you'll see all your vendors regardless of frequently of use.",
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
export const achDetails = structuredObjectInput({
  label: "ACH Banking",
  required: false,
  comments: "ACH bank account and routing details.",
  inputs: {
    achEnabledInput,
    achBankRoutingNoInput,
    achBankAccountNoInput,
    achBankAccountTypeInput,
    achBankAccountClassInput,
  },
});
export const paymentSettings = structuredObjectInput({
  label: "Payment Settings",
  required: false,
  comments: "Payment method, terms, and notification preferences.",
  inputs: {
    doNotPayInput,
    preferredPaymentMethodInput,
    paymentTermInput,
    sendAutomaticPaymentNotificationInput,
    mergePaymentRequestsInput,
    vendorBillingTypeInput,
    paymentPriorityInput,
    termDiscountDisplayedOnCheckStubInput,
  },
});
export const form1099 = structuredObjectInput({
  label: "Form 1099",
  required: false,
  comments: "Form 1099 tax reporting details.",
  inputs: {
    form1099NameInput,
    form1099TypeInput,
    form1099BoxInput,
  },
});
export const vendorContactRoles = structuredObjectInput({
  label: "Contact Roles",
  required: false,
  comments: "Primary, pay-to, and return-to contact assignments.",
  inputs: {
    primaryContactNameInput,
    payToContactNameInput,
    returnToContactNameInput,
  },
});
export const createVendorInputs = {
  connection,
  vendorIdInput,
  vendorNameInput,
  oneTimeInput: oneTimeVendorInput,
  activeInput,
  companyNameInput,
  printAsInput: { ...printAsInput, required: true },
  name,
  contactDetails: contactDetailsWithCountryCode,
  excludedFromContactListInput,
  vendorTypeIdInput,
  parentVendorIdInput,
  glAccounts,
  taxInfo,
  form1099,
  attachmentsIdInput,
  creditLimitInput,
  onHoldInput,
  paymentSettings,
  commentsInput,
  defaultCurrencyInput,
  vendorContactRoles,
  achDetails,
  vendorAccountNoInput,
  locationAssignedAccountNoDisplayedOnCheckStubInput,
  restrictionTypeInput,
  restrictedLocationsInput,
  restrictedDepartmentsInput,
  customFieldsInput,
};
export const getVendorInputs = {
  connection,
  fieldsInput,
  recordNoInput: { ...recordNoInput, dataSource: "selectVendor" },
};
export const updateVendorInputs = {
  connection,
  vendorIdInput: {
    ...vendorIdInput,
    required: true,
    dataSource: "selectVendor",
  },
  vendorNameInput: { ...vendorNameInput, required: false },
  oneTimeInput: oneTimeVendorInput,
  activeInput,
  companyNameInput,
  printAsInput,
  name,
  contactDetails: contactDetailsWithCountryCode,
  excludedFromContactListInput,
  vendorTypeIdInput,
  parentVendorIdInput,
  glAccounts,
  taxInfo,
  form1099,
  attachmentsIdInput,
  creditLimitInput,
  onHoldInput,
  paymentSettings,
  commentsInput,
  defaultCurrencyInput,
  vendorContactRoles,
  achDetails,
  vendorAccountNoInput,
  locationAssignedAccountNoDisplayedOnCheckStubInput,
  restrictionTypeInput,
  restrictedLocationsInput,
  restrictedDepartmentsInput,
  customFieldsInput,
};
