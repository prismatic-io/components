import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanCustomFields,
  cleanFieldsList,
  cleanFunctionForXml,
} from "../util";
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
export const defaultExpenseGlAccountNoInput = input({
  label: "Default Expense GL Account No",
  type: "string",
  comments: "The default GL account number used for expense transactions.",
  required: false,
  example: "6000",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
});
export const offsetGlAccountNoInput = input({
  label: "Offset GL Account No",
  type: "string",
  comments: "The GL account number used for offset entries.",
  required: false,
  example: "2000",
  placeholder: "Enter GL account number",
  clean: util.types.toString,
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
  comments: "The last name (surname) of the contact.",
  required: false,
  example: "Doe",
  placeholder: "Enter last name",
  clean: util.types.toString,
});
export const firstNameInput = input({
  label: "First Name",
  type: "string",
  comments: "The given name of the contact.",
  required: false,
  example: "John",
  placeholder: "Enter first name",
  clean: util.types.toString,
});
export const middleNameInput = input({
  label: "Middle Name",
  type: "string",
  comments: "The middle name or initial of the contact.",
  required: false,
  example: "A.",
  placeholder: "Enter middle name",
  clean: util.types.toString,
});
export const prefixInput = input({
  label: "Prefix",
  type: "string",
  comments: "The name prefix or title, such as Mr., Mrs., or Dr.",
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
  comments: "The main phone number used to reach the contact.",
  required: false,
  example: "+1-555-123-4567",
  placeholder: "Enter phone number",
  clean: util.types.toString,
});
export const secondaryPhoneNoInput = input({
  label: "Secondary Phone Number",
  type: "string",
  comments: "An alternate phone number for the contact.",
  required: false,
  example: "+1-555-987-6543",
  placeholder: "Enter phone number",
  clean: util.types.toString,
});
export const cellularPhoneNoInput = input({
  label: "Cellular Phone Number",
  type: "string",
  comments: "The mobile phone number for the contact.",
  required: false,
  example: "+1-555-234-5678",
  placeholder: "Enter cellular phone number",
  clean: util.types.toString,
});
export const pagerNoInput = input({
  label: "Pager Number",
  type: "string",
  comments: "The pager number for the contact.",
  required: false,
  example: "+1-555-PAGER-01",
  placeholder: "Enter pager number",
  clean: util.types.toString,
});
export const faxNoInput = input({
  label: "Fax Number",
  type: "string",
  comments: "The fax number for sending documents to the contact.",
  required: false,
  example: "+1-555-345-6789",
  placeholder: "Enter fax number",
  clean: util.types.toString,
});
export const primaryEmailAddressInput = input({
  label: "Primary Email Address",
  type: "string",
  comments: "The main email address for correspondence with the contact.",
  required: false,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});
export const secondaryEmailAddressInput = input({
  label: "Secondary Email Address",
  type: "string",
  comments: "An alternate email address for the contact.",
  required: false,
  example: "jane.smith@example.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});
export const primaryUrlInput = input({
  label: "Primary URL",
  type: "string",
  comments: "The main website or homepage associated with the contact.",
  required: false,
  example: "https://www.example.com",
  placeholder: "Enter URL",
  clean: util.types.toString,
});
export const secondaryUrlInput = input({
  label: "Secondary URL",
  type: "string",
  comments: "An additional website associated with the contact.",
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
  comments: "The city for the mailing address.",
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
  comments: "The country for the mailing address.",
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
export const contactDetails = structuredObjectInput({
  label: "Contact Details",
  required: false,
  comments: "Address, phone, email, and other contact channel details.",
  inputs: {
    addressLine1Input,
    addressLine2Input,
    cityInput,
    stateProvinceInput,
    zipPostalCodeInput,
    countryInput,
    primaryEmailAddressInput,
    secondaryEmailAddressInput,
    primaryPhoneNoInput,
    secondaryPhoneNoInput,
    cellularPhoneNoInput,
    pagerNoInput,
    faxNoInput,
    primaryUrlInput,
    secondaryUrlInput,
  },
});
export const contactDetailsWithCountryCode = structuredObjectInput({
  label: "Contact Details",
  required: false,
  comments: "Address, phone, email, and other contact channel details.",
  inputs: {
    addressLine1Input,
    addressLine2Input,
    cityInput,
    stateProvinceInput,
    zipPostalCodeInput,
    countryInput,
    isoCountryCodeInput,
    primaryEmailAddressInput,
    secondaryEmailAddressInput,
    primaryPhoneNoInput,
    secondaryPhoneNoInput,
    cellularPhoneNoInput,
    pagerNoInput,
    faxNoInput,
    primaryUrlInput,
    secondaryUrlInput,
  },
});
export const name = structuredObjectInput({
  label: "Name",
  required: false,
  comments: "First, middle, and last name with prefix.",
  inputs: {
    prefixInput,
    firstNameInput,
    middleNameInput,
    lastNameInput,
  },
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
export const glGroupNameInput = input({
  label: "GL Group Name",
  type: "string",
  comments: "Name of the GL group",
  required: false,
  example: "Default GL Group",
  placeholder: "Enter GL group name",
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
  comments:
    "The maximum outstanding balance allowed before transactions are blocked.",
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
  comments:
    "The ISO 4217 currency code used as the default for transactions (e.g., USD, EUR).",
  required: false,
  example: "USD",
  placeholder: "Enter currency code (e.g., USD)",
  clean: util.types.toString,
});
export const currencyInput = input({
  label: "Currency",
  type: "string",
  comments: "The ISO 4217 currency code for the transaction (e.g., USD, EUR).",
  required: false,
  example: "USD",
  placeholder: "Enter currency code (e.g., USD)",
  clean: util.types.toString,
});
export const baseCurrencyInput = input({
  label: "Base Currency",
  type: "string",
  comments:
    "The ISO 4217 base (functional) currency code for the company (e.g., USD).",
  required: false,
  example: "USD",
  placeholder: "Enter currency code (e.g., USD)",
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
export const taxInfo = structuredObjectInput({
  label: "Tax Information",
  required: false,
  comments: "Tax ID, taxable status, and tax group.",
  inputs: {
    taxIdInput,
    taxableInput,
    contactTaxGroupNameInput,
  },
});
export const glAccounts = structuredObjectInput({
  label: "GL Accounts",
  required: false,
  comments:
    "GL group, default expense GL account, and offset GL account numbers.",
  inputs: {
    glGroupNameInput,
    defaultExpenseGlAccountNoInput,
    offsetGlAccountNoInput,
  },
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
  clean: cleanCustomFields,
});
export const fieldsInput = input({
  label: "Field",
  type: "string",
  collection: "valuelist",
  comments: "Field to retrieve, use * for all fields",
  example: "*",
  placeholder: "Enter field names",
  required: true,
  clean: cleanFieldsList,
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
export const descriptionInput = input({
  label: "Description",
  type: "string",
  comments: "A text description or memo for the record.",
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
export const dueDateInput = input({
  label: "Due Date",
  type: "string",
  comments: "The payment due date in MM/DD/YYYY format.",
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: true,
  clean: util.types.toString,
});
export const dateCreatedInput = input({
  label: "Date Created",
  type: "string",
  comments: "Invoice date creation date",
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: true,
  clean: util.types.toString,
});
export const exchRateTypeInput = input({
  label: "Exchange Rate Type",
  type: "string",
  comments: "Exchange rate type for the invoice",
  example: "Intacct Daily Rate",
  placeholder: "Enter exchange rate type",
  required: false,
  clean: util.types.toString,
});
export const datePostedInput = input({
  label: "GL Date Posted",
  type: "string",
  comments: "Invoice General Ledger posted date",
  example: "12/06/2023",
  placeholder: "Enter date (MM/DD/YYYY)",
  required: false,
  clean: util.types.toString,
});
export const invoiceNumberInput = input({
  label: "Invoice Number",
  type: "string",
  comments: "The unique invoice number used to identify the invoice.",
  example: "1234",
  placeholder: "Enter number",
  required: true,
  clean: util.types.toString,
  dataSource: "selectInvoice",
});
export const keyId = input({
  label: "Record Number",
  comments: "Invoice RECORDNO to update",
  example: "123",
  placeholder: "Enter record number",
  type: "string",
  required: true,
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
export const additionalXmlTagsInput = input({
  label: "Additional XML Tags",
  type: "code",
  language: "xml",
  comments:
    "Additional XML tags that might not be covered by the standard inputs.",
  example: "<PRBATCHKEY>123456</PRBATCHKEY>",
  required: false,
  clean: cleanFunctionForXml,
});
export const paymentPriorityInput = input({
  label: "Payment Priority",
  type: "string",
  comments: "The priority level for processing vendor payments.",
  required: false,
  example: "High",
  placeholder: "Enter payment priority",
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
