import { input, util } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanFunctionForXml,
  pollResourceModel,
} from "../utils";
import { ALL_DELETE_OBJECTS_MODEL } from "../constants";

export const vendorIdInput = input({
  label: "Vendor ID",
  type: "string",
  required: false,
  comments:
    "Unique ID for the vendor. Required if company does not use document sequencing, or you can provide a value to use instead of the document sequence value.",
  example: "VENDOR-001",
  placeholder: "Enter vendor ID",
  clean: util.types.toString,
  dataSource: "selectVendor",
});

export const vendorNameInput = input({
  label: "Vendor Name",
  type: "string",
  required: true,
  example: "Acme Supplies Inc.",
  placeholder: "Enter vendor name",
  clean: util.types.toString,
});

export const vendorTypeIdInput = input({
  label: "Vendor Type ID",
  type: "string",
  required: false,
  example: "TYPE-001",
  placeholder: "Enter vendor type ID",
  clean: util.types.toString,
});

export const parentVendorIdInput = input({
  label: "Parent Vendor ID",
  type: "string",
  required: false,
  example: "VENDOR-PARENT-001",
  placeholder: "Enter parent vendor ID",
  clean: util.types.toString,
});

export const form1099NameInput = input({
  label: "Form 1099 Name",
  type: "string",
  required: false,
  example: "John Doe",
  placeholder: "Enter 1099 name",
  clean: util.types.toString,
});

export const form1099TypeInput = input({
  label: "Form 1099 Type",
  type: "string",
  required: false,
  example: "MISC",
  placeholder: "Enter 1099 type",
  clean: util.types.toString,
});

export const form1099BoxInput = input({
  label: "Form 1099 Box",
  type: "string",
  required: false,
  example: "7",
  placeholder: "Enter box number",
  clean: util.types.toString,
});

export const defaultExpenseGlAccountNoInput = input({
  label: "Default Expense GL Account No",
  type: "string",
  required: false,
  example: "6000",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
});

export const offsetGlAccountNoInput = input({
  label: "Offset GL Account No",
  type: "string",
  required: false,
  example: "2000",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
});

export const doNotPayInput = input({
  label: "Do Not Pay",
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

export const payToContactNameInput = input({
  label: "Pay To Contact Name",
  type: "string",
  required: false,
  example: "John Doe",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});

export const returnToContactNameInput = input({
  label: "Return To Contact Name",
  type: "string",
  required: false,
  example: "Jane Smith",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});

export const preferredPaymentMethodInput = input({
  label: "Preferred Payment Method",
  type: "string",
  required: false,
  example: "Check",
  placeholder: "Enter payment method",
  clean: util.types.toString,
});

export const sendAutomaticPaymentNotificationInput = input({
  label: "Send Automatic Payment Notification",
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

export const mergePaymentRequestsInput = input({
  label: "Merge Payment Requests",
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

export const vendorBillingTypeInput = input({
  label: "Vendor Billing Type",
  type: "string",
  required: false,
  example: "Standard",
  placeholder: "Enter billing type",
  clean: util.types.toString,
});

export const paymentPriorityInput = input({
  label: "Payment Priority",
  type: "string",
  required: false,
  example: "High",
  placeholder: "Enter payment priority",
  clean: util.types.toString,
});

export const termDiscountDisplayedOnCheckStubInput = input({
  label: "Term Discount Displayed On Check Stub",
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

export const achEnabledInput = input({
  label: "ACH Enabled",
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

export const achBankRoutingNoInput = input({
  label: "ACH Bank Routing No",
  type: "string",
  required: false,
  example: "021000021",
  placeholder: "Enter routing number",
  clean: util.types.toString,
});

export const achBankAccountNoInput = input({
  label: "ACH Bank Account No",
  type: "string",
  required: false,
  example: "1234567890",
  placeholder: "Enter account number",
  clean: util.types.toString,
});

export const achBankAccountTypeInput = input({
  label: "ACH Bank Account Type",
  type: "string",
  required: false,
  example: "Checking",
  placeholder: "Enter account type",
  clean: util.types.toString,
});

export const achBankAccountClassInput = input({
  label: "ACH Bank Account Class",
  type: "string",
  required: false,
  example: "Business",
  placeholder: "Enter account class",
  clean: util.types.toString,
});

export const vendorAccountNoInput = input({
  label: "Vendor Account No",
  type: "string",
  required: false,
  example: "VEND-ACC-001",
  placeholder: "Enter vendor account number",
  clean: util.types.toString,
});

export const locationAssignedAccountNoDisplayedOnCheckStubInput = input({
  label: "Location Assigned Account No Displayed On Check Stub",
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

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Sage Intacct connection to use.",
});

export const customerIdInput = input({
  label: "Customer ID",
  type: "string",
  comments:
    "Unique ID. Required if company does not use document sequencing, or you can provide a value to use instead of the document sequence value.",
  required: false,
  example: "CUST-12345",
  placeholder: "Enter customer ID",
  clean: util.types.toString,
  dataSource: "selectCustomer",
});

export const customerNameInput = input({
  label: "Customer Name",
  type: "string",
  comments: "Customer name",
  required: true,
  example: "Global Tech Solutions",
  placeholder: "Enter customer name",
  clean: util.types.toString,
});

export const oneTimeCustomerInput = input({
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

export const oneTimeVendorInput = input({
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

export const activeInput = input({
  label: "Active Status",
  comments:
    "When true, the record is active and available for use. When false, the record is inactive.",
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

export const lastNameInput = input({
  label: "Last Name",
  type: "string",
  comments: "Last name",
  required: false,
  example: "Doe",
  placeholder: "Enter last name",
  clean: util.types.toString,
});

export const firstNameInput = input({
  label: "First Name",
  type: "string",
  comments: "First name",
  required: false,
  example: "John",
  placeholder: "Enter first name",
  clean: util.types.toString,
});

export const middleNameInput = input({
  label: "Middle Name",
  type: "string",
  comments: "Middle name",
  required: false,
  example: "A.",
  placeholder: "Enter middle name",
  clean: util.types.toString,
});

export const prefixInput = input({
  label: "Prefix",
  type: "string",
  comments: "Prefix for the name",
  required: false,
  example: "Mr.",
  placeholder: "Enter prefix (e.g., Mr., Mrs., Dr.)",
  clean: util.types.toString,
});

export const companyNameInput = input({
  label: "Company Name",
  type: "string",
  comments: "Name of the company",
  required: false,
  example: "Acme Corporation",
  placeholder: "Enter company name",
  clean: util.types.toString,
});

export const printAsInput = input({
  label: "Print Name As",
  type: "string",
  comments: "Determine the format the name should be printed.",
  required: false,
  example: "John A. Doe",
  placeholder: "Enter formatted name",
  clean: util.types.toString,
});

export const primaryPhoneNoInput = input({
  label: "Primary Phone Number",
  type: "string",
  comments: "Primary phone number",
  required: false,
  example: "+1-555-123-4567",
  placeholder: "Enter phone number",
  clean: util.types.toString,
});

export const secondaryPhoneNoInput = input({
  label: "Secondary Phone Number",
  type: "string",
  comments: "Secondary phone number",
  required: false,
  example: "+1-555-987-6543",
  placeholder: "Enter phone number",
  clean: util.types.toString,
});

export const cellularPhoneNoInput = input({
  label: "Cellular Phone Number",
  type: "string",
  comments: "Cellular phone number",
  required: false,
  example: "+1-555-234-5678",
  placeholder: "Enter cellular phone number",
  clean: util.types.toString,
});

export const pagerNoInput = input({
  label: "Pager Number",
  type: "string",
  comments: "Pager number",
  required: false,
  example: "+1-555-PAGER-01",
  placeholder: "Enter pager number",
  clean: util.types.toString,
});

export const faxNoInput = input({
  label: "Fax Number",
  type: "string",
  comments: "Fax number",
  required: false,
  example: "+1-555-345-6789",
  placeholder: "Enter fax number",
  clean: util.types.toString,
});

export const primaryEmailAddressInput = input({
  label: "Primary Email Address",
  type: "string",
  comments: "Primary email address",
  required: false,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});

export const secondaryEmailAddressInput = input({
  label: "Secondary Email Address",
  type: "string",
  comments: "Secondary email address",
  required: false,
  example: "jane.smith@example.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});

export const primaryUrlInput = input({
  label: "Primary URL",
  type: "string",
  comments: "Primary URL",
  required: false,
  example: "https://www.example.com",
  placeholder: "Enter URL",
  clean: util.types.toString,
});

export const secondaryUrlInput = input({
  label: "Secondary URL",
  type: "string",
  comments: "Secondary URL",
  required: false,
  example: "https://www.example.com",
  placeholder: "Enter URL",
  clean: util.types.toString,
});

export const addressLine1Input = input({
  label: "Address Line 1",
  type: "string",
  comments: "First line's address",
  required: false,
  example: "123 Main St.",
  placeholder: "Enter address line 1",
  clean: util.types.toString,
});

export const addressLine2Input = input({
  label: "Address Line 2",
  type: "string",
  comments: "Second line's address",
  required: false,
  example: "Suite 400",
  placeholder: "Enter address line 2",
  clean: util.types.toString,
});

export const cityInput = input({
  label: "City",
  type: "string",
  comments: "City name.",
  example: "New York",
  placeholder: "Enter city",
  required: false,
  clean: util.types.toString,
});

export const stateProvinceInput = input({
  label: "State/Province",
  type: "string",
  comments: "State or province",
  example: "NY",
  placeholder: "Enter state or province",
  required: false,
  clean: util.types.toString,
});

export const zipPostalCodeInput = input({
  label: "ZIP/Postal Code",
  type: "string",
  comments: "ZIP or postal code.",
  example: "10001",
  placeholder: "Enter ZIP or postal code",
  required: false,
  clean: util.types.toString,
});

export const countryInput = input({
  label: "Country",
  type: "string",
  comments: "Country name.",
  example: "United States",
  placeholder: "Enter country",
  required: false,
  clean: util.types.toString,
});

export const isoCountryCodeInput = input({
  label: "ISO Country Code",
  type: "string",
  comments:
    "ISO country code. When ISO country codes are enabled in a company, both COUNTRY and ISOCOUNTRYCODE must be provided.",
  required: false,
  example: "US",
  placeholder: "Enter ISO country code",
  clean: util.types.toString,
});

export const excludedFromContactListInput = input({
  label: "Excluded From Contact List",
  comments:
    "When true, this contact will be excluded from contact lists and searches. When false, the contact appears in all lists.",
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

export const customerTypeIdInput = input({
  label: "Customer Type ID",
  type: "string",
  comments: "Identifier for the type of customer",
  required: false,
  example: "TYPE-001",
  placeholder: "Enter customer type ID",
  clean: util.types.toString,
});

export const salesRepEmployeeIdInput = input({
  label: "Sales Rep Employee ID",
  type: "string",
  comments: "Employee ID of the sales representative",
  required: false,
  example: "EMP-001",
  placeholder: "Enter employee ID",
  clean: util.types.toString,
});

export const parentCustomerIdInput = input({
  label: "Parent Customer ID",
  type: "string",
  comments: "Identifier of the parent customer",
  required: false,
  example: "CUST-PARENT-001",
  placeholder: "Enter parent customer ID",
  clean: util.types.toString,
});

export const glGroupNameInput = input({
  label: "GL Group Name",
  type: "string",
  comments: "Name of the GL group",
  required: false,
  example: "Default GL Group",
  placeholder: "Enter GL group name",
  clean: util.types.toString,
});

export const territoryIdInput = input({
  label: "Territory ID",
  type: "string",
  comments: "Identifier for the territory",
  required: false,
  example: "TERR-001",
  placeholder: "Enter territory ID",
  clean: util.types.toString,
});

export const attachmentsIdInput = input({
  label: "Attachments ID",
  type: "string",
  comments: "Id of an attachment group of one or more supporting files",
  required: false,
  example: "ATT-001",
  placeholder: "Enter attachments ID",
  clean: util.types.toString,
});

export const paymentTermInput = input({
  label: "Payment Term",
  type: "string",
  comments: "A previously created payment term",
  example: "Net 30",
  placeholder: "Enter term name (e.g., Net 30, Net 60)",
  required: false,
  clean: util.types.toString,
});

export const offsetArGlAccountNoInput = input({
  label: "Offset AR GL Account No",
  type: "string",
  comments: "Offset AR GL account number",
  required: false,
  example: "1200",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
});

export const defaultRevenueGlAccountNoInput = input({
  label: "Default Revenue GL Account No",
  type: "string",
  comments: "Default AR GL account number",
  required: false,
  example: "4000",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
});

export const shippingMethodInput = input({
  label: "Shipping Method",
  type: "string",
  comments: "Shipping method",
  required: false,
  example: "FedEx Ground",
  placeholder: "Enter shipping method",
  clean: util.types.toString,
});

export const resaleNumberInput = input({
  label: "Resale Number",
  type: "string",
  comments: "Resale certificate number for tax-exempt purchases",
  required: false,
  example: "RSL-123456",
  placeholder: "Enter resale number",
  clean: util.types.toString,
});

export const taxableInput = input({
  label: "Taxable",
  comments:
    "When true, the item is subject to taxation. When false, the item is tax-exempt.",
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

export const contactTaxGroupNameInput = input({
  label: "Contact Tax Group Name",
  type: "string",
  comments: "Name of the tax group",
  required: false,
  example: "Standard Tax Group",
  placeholder: "Enter tax group name",
  clean: util.types.toString,
});

export const taxIdInput = input({
  label: "Tax ID",
  type: "string",
  comments: "Tax identification number (EIN/SSN)",
  required: false,
  example: "12-3456789",
  placeholder: "Enter tax ID",
  clean: util.types.toString,
});

export const creditLimitInput = input({
  label: "Credit Limit",
  type: "string",
  comments: "Credit limit amount",
  required: false,
  example: "50000",
  placeholder: "Enter credit limit",
  clean: util.types.toNumber,
});

export const onHoldInput = input({
  label: "On Hold",
  comments:
    "When true, the account is placed on hold and transactions are suspended. When false, the account operates normally.",
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

export const deliveryMethodInput = input({
  label: "Delivery Method",
  type: "string",
  comments:
    "Delivery method. Use either Print, E-Mail, or Print#~#E-Mail for both. If using E-Mail, the customer contact must have a valid e-mail address.",
  required: false,
  clean: util.types.toString,
});

export const defaultInvoiceMessageInput = input({
  label: "Default Invoice Message",
  type: "string",
  comments: "Default message for invoices",
  required: false,
  clean: util.types.toString,
});

export const commentsInput = input({
  label: "Comments",
  type: "string",
  comments: "Additional comments",
  required: false,
  clean: util.types.toString,
});

export const defaultCurrencyInput = input({
  label: "Default Currency",
  type: "string",
  comments: "Default currency code",
  required: false,
  example: "USD",
  placeholder: "USD",
  clean: util.types.toString,
});

export const currencyInput = input({
  label: "Currency",
  type: "string",
  comments: "Transaction currency code",
  required: false,
  example: "USD",
  placeholder: "USD",
  clean: util.types.toString,
});

export const baseCurrencyInput = input({
  label: "Base Currency",
  type: "string",
  comments: "Base currency code",
  required: false,
  example: "USD",
  placeholder: "USD",
  clean: util.types.toString,
});

export const apBillItemsInput = input({
  label: "AP Bill Items",
  type: "code",
  language: "xml",
  comments:
    "AP bill items, must have at least 1. Each item must be wrapped in <APBILLITEM></APBILLITEM> tags.",
  required: true,
  default: `<APBILLITEM>
  <ACCOUNTNO>10000</ACCOUNTNO>
  <TRX_AMOUNT>100.12</TRX_AMOUNT>
  <ENTRYDESCRIPTION>Line 1 of my bill</ENTRYDESCRIPTION>
  <LOCATIONID>Alder</LOCATIONID>
  <DEPARTMENTID>12345</DEPARTMENTID>
</APBILLITEM>
<APBILLITEM>
  <ACCOUNTNO>10000</ACCOUNTNO>
  <TRX_AMOUNT>100.12</TRX_AMOUNT>
  <ENTRYDESCRIPTION>Line 2 of my bill</ENTRYDESCRIPTION>
  <LOCATIONID>Alder</LOCATIONID>
  <DEPARTMENTID>12345</DEPARTMENTID>
</APBILLITEM>`,
  example:
    "https://developer.intacct.com/api/accounts-payable/bills/#create-bill",
  clean: cleanFunctionForXml,
});

export const invoiceLineItemsInput = input({
  label: "Invoice Line Items",
  type: "code",
  language: "xml",
  comments:
    "Invoice lines, must have at least 1. Each item must be wrapped in <lineitem></lineitem> tags.",
  required: true,
  default: `<lineitem>
  <glaccountno>10016</glaccountno>
  <amount>345.43</amount>
  <locationid>oriongroup</locationid>
  <departmentid>D200</departmentid>
  <classid>C12</classid>
</lineitem>
<lineitem>
  <glaccountno>10016</glaccountno>
  <amount>345.43</amount>
  <locationid>oriongroup</locationid>
  <departmentid>D200</departmentid>
  <classid>C12</classid>
</lineitem>`,
  example:
    "https://developer.intacct.com/api/accounts-receivable/invoices/#create-invoice-legacy",
  clean: cleanFunctionForXml,
});

export const printOptionArInvoiceTemplateNameInput = input({
  label: "Print Option AR Invoice Template Name",
  type: "string",
  comments: "Template name for AR invoices",
  required: false,
  clean: util.types.toString,
});

export const printOptionOeQuoteTemplateNameInput = input({
  label: "Print Option OE Quote Template Name",
  type: "string",
  comments: "Template name for OE quotes",
  required: false,
  clean: util.types.toString,
});

export const printOptionOeOrderTemplateNameInput = input({
  label: "Print Option OE Order Template Name",
  type: "string",
  comments: "Template name for OE orders",
  required: false,
  clean: util.types.toString,
});

export const printOptionOeListTemplateNameInput = input({
  label: "Print Option OE List Template Name",
  type: "string",
  comments: "Template name for OE lists",
  required: false,
  clean: util.types.toString,
});

export const printOptionOeInvoiceTemplateNameInput = input({
  label: "Print Option OE Invoice Template Name",
  type: "string",
  comments: "Template name for OE invoices",
  required: false,
  clean: util.types.toString,
});

export const printOptionOeAdjustmentTemplateNameInput = input({
  label: "Print Option OE Adjustment Template Name",
  type: "string",
  comments: "Template name for OE adjustments",
  required: false,
  clean: util.types.toString,
});

export const printOptionOeOtherTemplateNameInput = input({
  label: "Print Option OE Other Template Name",
  type: "string",
  comments: "Template name for other OE documents",
  required: false,
  clean: util.types.toString,
});

export const primaryContactNameInput = input({
  label: "Primary Contact Name",
  type: "string",
  comments: "Primary contact. If blank system will use DISPLAYCONTACT.",
  required: false,
  example: "John Doe",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});

export const billToContactNameInput = input({
  label: "Bill To Contact Name",
  type: "string",
  comments: "Bill to contact. If blank system will use DISPLAYCONTACT.",
  required: false,
  example: "Jane Smith",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});

export const shipToContactNameInput = input({
  label: "Ship To Contact Name",
  type: "string",
  comments: "Ship to contact. If blank system will use DISPLAYCONTACT.",
  required: false,
  example: "Bob Johnson",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});

export const restrictionTypeInput = input({
  label: "Restriction Type",
  type: "string",
  comments: "Type of restriction",
  required: false,
  clean: util.types.toString,
});

export const customFieldsInput = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  comments: "Custom field names and values as defined for this object",
  example: JSON.stringify([
    ["fieldName1", 123],
    ["fieldName2", "someStringValue"],
    ["fieldName3", { key: "value" }],
  ]),
  required: false,
  clean: (value) => {
    if (value && typeof value === "string" && value.length > 0) {
      try {
        const parsedValue = JSON.parse(value);
        if (!Array.isArray(parsedValue)) {
          throw new Error("Custom Fields must be an array, check the example");
        }
        return parsedValue;
      } catch (_e) {
        throw new Error("Custom Fields invalid JSON");
      }
    } else return [];
  },
});

export const fieldsInput = input({
  label: "Field",
  type: "string",
  collection: "valuelist",
  comments: "Field to retrieve, use * for all fields",
  example: "*",
  placeholder: "Enter field names",
  required: true,
  clean: (fields) => {
    if (fields && Array.isArray(fields) && fields.length > 0)
      return fields.map((field) => util.types.toString(field));
    return [];
  },
});

export const restrictedLocationsInput = input({
  label: "Restricted Location",
  type: "string",
  collection: "valuelist",
  comments: "Restricted location ID. Use if OBJECTRESTRICTION is Restricted",
  required: false,
});

export const restrictedDepartmentsInput = input({
  label: "Restricted Department",
  type: "string",
  collection: "valuelist",
  comments: "Restricted department IDs. Use if OBJECTRESTRICTION is Restricted",
  required: false,
});
export const recordNoInput = input({
  label: "Record No",
  type: "string",
  comments: "The unique record number identifier",
  example: "12345",
  placeholder: "Enter record number",
  required: true,
  clean: util.types.toString,
});

export const contactNameInput = input({
  label: "Contact Name",
  type: "string",
  comments: "Full name of the contact",
  required: true,
  example: "John Doe",
  placeholder: "Enter contact name",
  clean: util.types.toString,
  dataSource: "selectContact",
});

export const objectNameInput = input({
  label: "Object Name",
  type: "string",
  comments:
    "Name of the object to query. Possible values are: VENDOR, APBILL, APPYMT, ARPYMT, ARADJUSTMENT, ARADJUSTMENTITEM, ARADVANCE, etc.",
  example: "VENDOR",
  placeholder: "Enter object name (e.g., VENDOR, APBILL)",
  required: true,
  clean: util.types.toString,
});

export const queryInput = input({
  label: "Query",
  type: "string",
  comments: "Query filter expression to filter the records",
  required: false,
  example: "VENDOR.CREDITLIMIT > 10000",
  placeholder: "Enter query filter",
  clean: util.types.toString,
});

export const billTransactionDateInput = input({
  label: "Bill Transaction Date",
  type: "string",
  comments: "Transaction date in MM/DD/YYYY format",
  required: true,
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  clean: util.types.toString,
});

export const billTransactionGlPostingDateInput = input({
  label: "Bill GL Posting Date",
  type: "string",
  comments: "General ledger posting date in MM/DD/YYYY format",
  required: false,
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  clean: util.types.toString,
});

export const billNumberInput = input({
  label: "Bill Number",
  type: "string",
  comments: "A Bill Number identifier",
  example: "BILL-2024-001",
  placeholder: "Enter bill number",
  required: true,
  clean: util.types.toString,
});

export const docNumberInput = input({
  label: "Reference Number",
  type: "string",
  comments: "A reference number for the bill",
  example: "REF-2024-5678",
  placeholder: "Enter reference number",
  required: false,
  clean: util.types.toString,
});

export const descriptionInput = input({
  label: "Description",
  type: "string",
  comments: "Description of the bill",
  example: "Office supplies for Q1 2024",
  placeholder: "Enter description",
  required: false,
  clean: util.types.toString,
});

export const termNameInput = input({
  label: "Term Name",
  type: "string",
  comments: "Payment term, this should be a previously created term",
  example: "Net 30",
  placeholder: "Enter term name (e.g., Net 30, Net 60)",
  required: false,
  clean: util.types.toString,
});

export const recPaymentDateInput = input({
  label: "Recommended to pay on",
  type: "string",
  comments: "Payment date in MM/DD/YYYY format",
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: false,
  clean: util.types.toString,
});

export const dueDateInput = input({
  label: "Due Date",
  type: "string",
  comments: "Due date",
  example: "12/06/2023",
  placeholder: "12/06/2023",
  required: true,
  clean: util.types.toString,
});

export const dateCreatedInput = input({
  label: "Date Created",
  type: "string",
  comments: "Invoice date creation date",
  example: "12/06/2023",
  placeholder: "12/06/2023",
  required: true,
  clean: util.types.toString,
});

export const exchRateDateInput = input({
  label: "Exchange Rate Date",
  type: "string",
  comments: "Exchange rate date for the invoice",
  example: "12/06/2023",
  placeholder: "12/06/2023",
  required: false,
  clean: util.types.toString,
});

export const exchRateTypeInput = input({
  label: "Exchange Rate Type",
  type: "string",
  comments: "Exchange rate type for the invoice",
  example: "Intacct Daily Rate",
  placeholder: "Intacct Daily Rate",
  required: false,
  clean: util.types.toString,
});

export const datePostedInput = input({
  label: "GL Date Posted",
  type: "string",
  comments: "Invoice General Ledger posted date",
  example: "12/06/2023",
  placeholder: "12/06/2023",
  required: false,
  clean: util.types.toString,
});

export const invoiceNumberInput = input({
  label: "Invoice Number",
  type: "string",
  comments: "Invoice number",
  example: "1234",
  placeholder: "1234",
  required: true,
  clean: util.types.toString,
  dataSource: "selectInvoice",
});

export const ponumberInput = input({
  label: "Reference Number",
  type: "string",
  comments: "A reference number for the invoice",
  example: "1234",
  placeholder: "1234",
  required: false,
  clean: util.types.toString,
});

export const externalIdInput = input({
  label: "External ID",
  type: "string",
  comments: "An external ID for the invoice",
  example: "1234",
  placeholder: "1234",
  required: false,
  clean: util.types.toString,
});

export const noglInput = input({
  label: "No GL",
  comments: "Do not post to GL. Use false for No, true for Yes.",
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

export const customFieldsXmlInput = input({
  label: "Custom Fields",
  type: "code",
  language: "xml",
  comments: "Custom field names and values as defined for this object",
  example: `
  <customfield>
    <customfieldname>MYCUSTOMFIELD</customfieldname>
    <customfieldvalue>MYCUSTOMFIELDVALUE</customfieldvalue>
  </customfield>
  `,
  required: false,
  clean: cleanFunctionForXml,
});

export const object = input({
  label: "Object",
  type: "string",
  comments: "Type of object to delete",
  model: ALL_DELETE_OBJECTS_MODEL,
  required: true,
  clean: util.types.toString,
});

export const keys = input({
  label: "Keys",
  type: "string",
  comments:
    "A key or comma-separated list (123,456) of keys (RECORDNO's) to delete",
  example: "123",
  placeholder: "123",
  required: true,
  clean: util.types.toString,
});

export const keyId = input({
  label: "Record Number",
  comments: "Invoice RECORDNO to update",
  example: "123",
  placeholder: "123",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const dateDueInput = input({
  label: "Date Due",
  type: "string",
  comments: "Due date. Required if not using termname.",
  required: false,
  example: "12/06/2023",
  placeholder: "12/06/2023",
  clean: util.types.toString,
});

export const exchRateInput = input({
  label: "Exchange Rate",
  type: "string",
  comments:
    "Exchange rate for the invoice. Do not use if Exchange Rate Type is used.",
  required: false,
  clean: util.types.toString,
});

export const explicitArray = input({
  label: "Array JSON Nodes",
  type: "boolean",
  comments:
    "Always put child nodes from XML in an array. If toggled off, an array is created only if there is more than one. Use this when 'Response Type' is set to 'JSON'.",
  required: false,
  default: "true",
  clean: util.types.toBool,
});

export const projectIdInput = input({
  label: "Project ID",
  type: "string",
  comments:
    "Unique ID for the project. Required if company does not use document sequencing, or you can provide a value to use instead of the document sequence value.",
  required: false,
  example: "21-1234",
  placeholder: "21-1234",
  clean: util.types.toString,
  dataSource: "selectProject",
});

export const projectNameInput = input({
  label: "Project Name",
  type: "string",
  comments: "Project name",
  example: "Sample Project",
  placeholder: "Sample Project",
  required: true,
  clean: util.types.toString,
});

export const projectCategoryInput = input({
  label: "Project Category",
  type: "string",
  comments: "Project category",
  required: true,
  example: "Contract",
  placeholder: "Contract",
  clean: util.types.toString,
});

export const projectDescriptionInput = input({
  label: "Project Description",
  type: "string",
  comments: "Project description",
  required: false,
  example: "This is a sample project",
  placeholder: "This is a sample project",
  clean: util.types.toString,
});

export const parentProjectIdInput = input({
  label: "Parent Project ID",
  type: "string",
  comments: "Parent project ID",
  required: false,
  example: "21-1234",
  placeholder: "21-1234",
  clean: util.types.toString,
});

export const invoiceWithParentInput = input({
  label: "Invoice with Parent",
  type: "boolean",
  comments: "Use false for No, true for Yes. (Default: false)",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const projectTypeInput = input({
  label: "Project Type",
  type: "string",
  comments: "Project type",
  required: false,
  example: "Type 1",
  placeholder: "Type 1",
  clean: util.types.toString,
});

export const projectStatusInput = input({
  label: "Project Status",
  type: "string",
  comments: "Project status",
  required: false,
  example: "In Progress",
  placeholder: "In Progress",
  clean: util.types.toString,
});

export const statusInput = input({
  label: "Status",
  type: "boolean",
  comments: "Use false for Inactive, true for Active. (Default: true)",
  default: "true",
  clean: util.types.toBool,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments: "Additional fields that are not covered by the standard inputs.",
  required: false,
  example: JSON.stringify({}, null, 2),
  clean: cleanCodeInput,
});

export const modelBooleanUpdateInput = input({
  label: "",
  type: "string",
  required: false,
  default: undefined,
  model: ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  })),
  clean: cleanBooleanInput,
});

const arAdjustmentLineItemsInput = input({
  label: "AR Adjustment Line Items",
  type: "code",
  language: "xml",
  required: true,
  example: `
  <updatelineitem line_num="1">
    <glaccountno>4000</glaccountno>
    <amount>100.25</amount>
    <memo>line 1</memo>
    <locationid>L100</locationid>
    <departmentid>D200</departmentid>
  </updatelineitem>
  <lineitem>
    <glaccountno>4000</glaccountno>
    <amount>20.99</amount>
    <memo>add a new line</memo>
    <locationid>L100</locationid>
    <departmentid>D200</departmentid>
  </lineitem>`,
  clean: cleanFunctionForXml,
});

const adjustmentNoInput = input({
  label: "Adjustment Number",
  type: "string",
  comments: "Adjustment number",
  required: false,
  clean: util.types.toString,
});

const actionInput = input({
  label: "Action",
  type: "string",
  comments: "Action. Use Draft or Submit. (Default: Submit)",
  model: [
    {
      label: "Draft",
      value: "Draft",
    },
    {
      label: "Submit",
      value: "Submit",
    },
  ],
  required: false,
  clean: util.types.toString,
});

const additionalXmlTagsInput = input({
  label: "Additional XML Tags",
  type: "code",
  language: "xml",
  comments:
    "Additional XML tags that might not be covered by the standard inputs.",
  example: "<PRBATCHKEY>123456</PRBATCHKEY>",
  required: false,
  clean: cleanFunctionForXml,
});

export const updateARAdjustmentInputs = {
  connection,
  keyId: { ...keyId, comments: "AR Adjustment RECORDNO of bill to update." },
  customerIdInput: {
    ...customerIdInput,
    comments: "AR Adjustment CUSTOMERID to update.",
  },
  dateCreatedInput: {
    ...dateCreatedInput,
    comments: "AR Adjustment DATECREATED to update.",
    required: false,
  },
  datePostedInput: {
    ...datePostedInput,
    comments: "AR Adjustment DATEPOSTED to update.",
  },
  descriptionInput: {
    ...descriptionInput,
    comments: "AR Adjustment DESCRIPTION to update.",
  },
  currencyInput: {
    ...currencyInput,
    comments: "AR Adjustment CURRENCY to update.",
  },
  exchRateTypeInput: {
    ...exchRateTypeInput,
    comments: "AR Adjustment EXCHRATETYPE to update.",
  },
  adjustmentNoInput: {
    ...adjustmentNoInput,
    comments: "AR Adjustment ADJUSTMENTNO to update.",
  },
  invoiceNoInput: {
    ...invoiceNumberInput,
    comments: "AR Adjustment INVOICENO to update.",
    required: false,
  },
  arAdjustmentLineItemsInput: {
    ...arAdjustmentLineItemsInput,
    comments:
      "AR Adjustment LINEITEMS to update. Each item must be wrapped in <updatelineitem></updatelineitem> or <lineitem></lineitem> tags.",
    required: false,
  },
  actionInput,
  additionalXmlTagsInput: {
    ...additionalXmlTagsInput,
    example: `<basecurr>USD</basecurr>
              <exchratedate>
                <year>2021</year>
                <month>09</month>
                <day>12</day>
              </exchratedate>
              <exchrate>1.23</exchrate>
    `,
  },
};

const paymentDateInput = input({
  label: "Payment Date",
  type: "string",
  comments: "Date the advance payment was made, in the mm/dd/yyyy format.",
  example: "09/12/2021",
  placeholder: "09/12/2021",
  required: true,
  clean: util.types.toString,
});

const receiptDateInput = input({
  label: "Receipt Date",
  type: "string",
  comments:
    "Receipt date in the mm/dd/yyyy format. If automatic summaries are enabled, this is the date on which the advance will be posted to the General Ledger.",
  example: "09/12/2021",
  placeholder: "09/12/2021",
  required: true,
  clean: util.types.toString,
});

const paymentMethodInput = input({
  label: "Payment Method",
  type: "string",
  comments: "Payment method used for the advance.",
  model: [
    {
      label: "Printed Check",
      value: "Printed Check",
    },
    {
      label: "Cash",
      value: "Cash",
    },
    {
      label: "EFT",
      value: "EFT",
    },
    {
      label: "Credit Card",
      value: "Credit Card",
    },
  ],
  example: "Cash",
  required: true,
  clean: util.types.toString,
});

const financialEntityInput = input({
  label: "Financial Entity",
  type: "string",
  comments:
    "ID of the checking or savings account to deposit the funds to. A create request must contain FINANCIALENTITY or UNDEPOSITEDACCOUNTNO when automatic summaries are enabled.",
  example: "1020",
  placeholder: "1020",
  required: false,
  clean: util.types.toString,
});

const undepositedAccountNoInput = input({
  label: "Undeposited Account No",
  type: "string",
  comments:
    "Undeposited funds account number. A create request must contain FINANCIALENTITY or UNDEPOSITEDACCOUNTNO when automatic summaries are enabled.",
  example: "1020",
  placeholder: "1020",
  required: false,
  clean: util.types.toString,
});

const arAdvanceItemsInput = input({
  label: "AR Advance Items",
  type: "code",
  language: "xml",
  comments:
    "Advance lines, must have at least 1. Check [Documentation](https://developer.intacct.com/api/accounts-receivable/ar-advances/) for additional tags.",
  required: true,
  example: `<ARADVANCEITEM>
        <ACCOUNTNO>4055</ACCOUNTNO>
        <ACCOUNTLABEL>Misc Sales</ACCOUNTLABEL>
        <TRX_AMOUNT>1000</TRX_AMOUNT>
        <LOCATIONID>CA</LOCATIONID>
      </ARADVANCEITEM>`,
  clean: cleanFunctionForXml,
});

export const updateARAdvanceInputs = {
  connection,
  recordNoInput: {
    ...recordNoInput,
    comments: "AR Advance RECORDNO to update.",
  },
  arAdvanceItemsInput: {
    ...arAdvanceItemsInput,
    required: false,
    comments:
      "AR Advance ARADVANCEITEMS to update. <strong>Note:</strong> To add an advance line, supply all the original lines along with the new one. To delete a line, supply only the lines that you want to keep. To modify a line, supply all the original lines and change the field values you want.",
  },
  paymentDateInput: {
    ...paymentDateInput,
    required: false,
    comments: "AR Advance PAYMENTDATE to update.",
  },
  receiptDateInput: {
    ...receiptDateInput,
    required: false,
    comments: "AR Advance RECEIPTDATE to update.",
  },
  paymentMethodInput: {
    ...paymentMethodInput,
    required: false,
    comments: "AR Advance PAYMENTMETHOD to update.",
  },
  financialEntityInput: {
    ...financialEntityInput,
    comments: "AR Advance FINANCIALENTITY to update.",
  },
  undepositedAccountNoInput: {
    ...undepositedAccountNoInput,
    comments: "AR Advance UNDEPOSITEDACCOUNTNO to update.",
  },
  additionalXmlTagsInput: {
    ...additionalXmlTagsInput,
    example: `<PRBATCH>123456</PRBATCH>
              <PRBATCHKEY>123456</PRBATCHKEY>
              <DOCNUMBER>123456</DOCNUMBER>
              <DESCRIPTION>Advance Description</DESCRIPTION>
              <CURRENCY>USD</CURRENCY>
              <BASECURR>USD</BASECURR>
              <EXCH_RATE_DATE>
                <year>2021</year>
                <month>09</month>
                <day>12</day>
              </EXCH_RATE_DATE>
              <EXCH_RATE>1.23</EXCH_RATE>
              <EXCH_RATE_TYPE_ID>Intacct Daily Rate</EXCH_RATE_TYPE_ID>
              <SUPDOCID>123456</SUPDOCID>              
              `,
  },
};

export const createARAdvanceInputs = {
  connection,
  paymentDateInput,
  receiptDateInput,
  paymentMethodInput,
  arAdvanceItemsInput,
  customerIdInput,
  financialEntityInput,
  undepositedAccountNoInput,
  additionalXmlTagsInput: {
    ...additionalXmlTagsInput,
    example:
      updateARAdvanceInputs.additionalXmlTagsInput.example +
      "<ACTION>Draft</ACTION>",
  },
};

export const returnIdInput = input({
  label: "Return ID",
  type: "boolean",
  comments:
    "Turn on to return the ID of the object (e.g. CUSTOMERID, PROJECTID, VENDORID, etc.) instead of the Record No.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const returnContactNameInput = input({
  label: "Return Contact Name",
  type: "boolean",
  comments: "Turn on to return the Contact Name instead of the Record No.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});




const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The Sage Intacct object to poll for new or updated records.",
  clean: util.types.toString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created records are included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
