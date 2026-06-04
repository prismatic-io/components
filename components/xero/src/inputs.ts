import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanObject, cleanStringInput } from "./util";
import { pollResourceModel } from "./constants";

export const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  comments: "Provide a string value for the Contact ID.",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Contact ID",
  dataSource: "selectContact",
  clean: cleanStringInput,
});

export const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  required: true,
  comments: "Provide a string value for the Invoice ID.",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Invoice ID",
  dataSource: "selectInvoice",
});

export const itemId = input({
  label: "Item ID",
  type: "string",
  required: true,
  comments: "Provide a string value for the Item ID.",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Item, ID",
  dataSource: "selectItem",
});

export const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  comments: "Provide a string value for the Account ID",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
  placeholder: "Account ID",
  dataSource: "selectAccount",
});

export const contactName = input({
  label: "Contact Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the name of the contact.",
  example: "Acme Inc.",
  placeholder: "Contact Name",
  clean: cleanStringInput,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "Provide a string value for the first name of the contact.",
  example: "John",
  placeholder: "First Name",
  clean: cleanStringInput,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "Provide a string value for the last name of the contact.",
  example: "Doe",
  placeholder: "Last Name",
  clean: cleanStringInput,
});

export const email = input({
  label: "Email Address",
  type: "string",
  required: false,
  comments: "Provide a valid email address for the contact.",
  example: "someone@example.com",
  placeholder: "Email Address",
  clean: cleanStringInput,
});

export const bankAccountDetails = input({
  label: "Bank Account Details",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the details of the contacts bank account. Depending on the type of account, providing a value for this field could cause your request to fail. For more information on the expected shape of the Account object, refer to the Xero docs: https://developer.xero.com/documentation/api/accounting/accounts/#get-accounts",
  example: "01-0123-example-00",
  placeholder: "Bank Account Details",
  clean: cleanStringInput,
});

export const taxNumber = input({
  label: "Tax Number",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the Tax number. For more information on what value to provide, refer to the Xero docs: https://developer.xero.com/documentation/api/accounting/types#tax-types",
  example: "12-345-678",
  placeholder: "Tax Number",
  clean: cleanStringInput,
});

export const accountsReceivableTaxType = input({
  label: "Accounts Receivable Tax Type",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the tax type of accounts receivable for the account. For more information on what value to provide, refer to the Xero docs: https://developer.xero.com/documentation/api/accounting/types#tax-types",
  example: "OUTPUT",
  placeholder: "Accounts Receivable Tax Type",
  clean: cleanStringInput,
});

export const accountsPayableTaxType = input({
  label: "Accounts Payable Tax Type",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the tax type of accounts payable for the account. For more information on what value to provide, refer to the Xero docs: https://developer.xero.com/documentation/api/accounting/types#tax-types",
  example: "OUTPUT",
  placeholder: "Accounts Payable Tax Type",
  clean: cleanStringInput,
});

export const defaultCurrency = input({
  label: "Default Currency",
  type: "string",
  required: false,
  comments: "Provide a valid type of currency.",
  example: "USD",
  placeholder: "Default Currency",
  clean: cleanStringInput,
});

export const contactNumber = input({
  label: "Contact Number",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the unique number identifier of the contact.",
  example: "IDexample01",
  placeholder: "Contact Number",
});

export const contactStatus = input({
  label: "Contact Status",
  type: "string",
  required: false,
  comments: "Provide a string value for the status of the contact.",
  model: [
    { label: "Active", value: "ACTIVE" },
    { label: "Archived", value: "ARCHIVED" },
    { label: "GDP Request", value: "GDPREQUEST" },
  ],
  placeholder: "Contact Status",
  clean: cleanStringInput,
});

export const city = input({
  label: "City",
  type: "string",
  required: false,
  comments: "Provide a string value for the city of the address.",
  example: "San Francisco",
  placeholder: "City",
  clean: cleanStringInput,
});

export const addressType = input({
  label: "Address Type",
  type: "string",
  required: false,
  comments: "Provide a string value for the address type.",
  example: "POBOX",
  model: [
    { label: "PO Box", value: "POBOX" },
    { label: "Street", value: "STREET" },
    { label: "Delivery", value: "DELIVERY" },
  ],
  placeholder: "Address Type",
  clean: cleanStringInput,
});

export const address = input({
  label: "Address",
  type: "string",
  required: false,
  comments: "Provide a string value that represents a valid address.",
  example: "4 Privet Drive",
  placeholder: "Address",
  clean: cleanStringInput,
});

export const postalCode = input({
  label: "Postal Code",
  type: "string",
  required: false,
  comments: "Provide a valid postal code.",
  example: "48423",
  placeholder: "Postal Code",
  clean: cleanStringInput,
});

export const itemCode = input({
  label: "Item Code",
  type: "string",
  required: true,
  comments: "Provide a user-defined valid item code.",
  example: "Untracked Item",
  placeholder: "Item Code",
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "Provide a string value for the description.",
  example: "This is an example description",
  placeholder: "Description",
});

export const purchaseDescription = input({
  label: "Purchase Description",
  type: "string",
  required: false,
  comments: "Provide a string value for the description.",
  example: "This is an example description",
  placeholder: "Purchase Description",
});

export const purchaseUnitPrice = input({
  label: "Purchase Unit Price",
  type: "string",
  required: false,
  comments: "Provide the unit price of the purchase.",
  example: "800",
  placeholder: "Purchase Unit Price",
});

export const purchaseAccountCode = input({
  label: "Purchase Account Code",
  type: "string",
  required: false,
  comments: "Provide the account code of the purchase.",
  example: "200",
  placeholder: "Purchase Account Code",
});

export const purchaseTaxType = input({
  label: "Purchase Tax Type",
  type: "string",
  required: false,
  comments:
    "Provide the tax type of the purchaser. Pick a value from the items listed here: https://developer.xero.com/documentation/api/accounting/types#tax-types",
  example: "NONE",
  placeholder: "Purchase Tax Type",
});

export const salesTaxType = input({
  label: "Sales Tax Type",
  type: "string",
  required: false,
  comments:
    "Provide the tax type of the Seller. Provide a value from the items listed here: https://developer.xero.com/documentation/api/accounting/types#tax-types",
  example: "NONE",
  placeholder: "Sale Tax Type",
});

export const salesUnitPrice = input({
  label: "Sales Unit Price",
  type: "string",
  required: false,
  comments: "Provide the unit price of the sale, if the item has been sold.",
  example: "50.69",
  placeholder: "Sales Unit Price",
});

export const salesAccountCode = input({
  label: "Sales Account Code",
  type: "string",
  required: false,
  comments: "Provide the account code of the sale.",
  example: "200",
  placeholder: "Sales Account Code",
});

export const itemName = input({
  label: "Item Name",
  type: "string",
  required: false,
  comments: "Provide a string value for the name of the item.",
  example: "Example Name",
  placeholder: "Item Name",
});

export const inventoryAssetAccountCode = input({
  label: "Inventory Asset Account Code",
  type: "string",
  required: false,
  comments: "Provide the account code for the inventory asset",
  example: "200",
  placeholder: "Inventory Asset Account Code",
});

export const isSold = input({
  label: "Is Sold",
  type: "boolean",
  required: false,
  comments:
    "Provide a boolean value to determine if the item has been sold yet.",
  placeholder: "Is Sold",
});

export const isPurchased = input({
  label: "Is Purchased",
  type: "boolean",
  required: false,
  comments:
    "Provide a boolean value to determine if the item has been purchased yet.",
  placeholder: "Is Purchased",
});

export const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "Provide a string value for notes to add to an object.",
  placeholder: "Notes",
  example: "These are example notes.",
});

export const invoiceType = input({
  label: "Invoice Type",
  type: "string",
  required: true,
  comments: "Provide a string value for the type of the given invoice.",
  placeholder: "Invoice Type",
  model: [
    { label: "Accounts Payable", value: "ACCPAY" },
    { label: "Accounts Receivable", value: "ACCREC" },
  ],
  clean: cleanStringInput,
});

export const date = input({
  label: "Date",
  type: "string",
  required: false,
  comments:
    "Date invoice was issued. If the Date element is not specified it will default to the current date based on the timezone setting of the organization.",
  placeholder: "2024-10-01",
  example: "2024-10-01",
  clean: cleanStringInput,
});

export const dueDate = input({
  label: "Due Date",
  type: "string",
  required: false,
  comments: "Date invoice is due.",
  placeholder: "2024-10-01",
  example: "2024-10-01",
  clean: cleanStringInput,
});

export const dueDateString = input({
  label: "Due Date String",
  type: "string",
  required: false,
  comments: "Provide a string value for the due date of the invoice.",
  placeholder: "2021-05-27T00:00:00",
  example: "2021-05-27T00:00:00",
  clean: cleanStringInput,
});

export const dateString = input({
  label: "Date String",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the date in which the invoice was created.",
  placeholder: "2021-05-27T00:00:00",
  example: "2021-05-27T00:00:00",
  clean: cleanStringInput,
});

export const lineAmountTypes = input({
  label: "Line Amount Type",
  type: "string",
  required: true,
  comments: "Provide a string value for the line Amount Types.",
  placeholder: "Line Amount Type",
  model: [
    { label: "Exclusive", value: "Exclusive" },
    { label: "Inclusive", value: "Inclusive" },
    { label: "No Tax", value: "NoTax" },
  ],
  clean: cleanStringInput,
});

export const lineItems = input({
  label: "Line Items",
  type: "code",
  required: false,
  language: "json",
  comments:
    "Provide a JSON array, For each item, provide an object describing a valid line item. The 'ItemCode', 'Tracking', and 'DiscountRate' properties are optional. If you want to provide no line items, simply enter an empty Array.",
  example: JSON.stringify(
    [
      {
        Description: "example description",
        Quantity: "10",
        ItemCode: "Use this value to reference an existing item.",
        UnitAmount: "100.00",
        AccountCode: "200",
        DiscountRate: "20",
        Tracking: [
          {
            Name: "Activity/Workstream",
            Option: "On site consultancy",
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: cleanObject,
});

export const invoiceNumber = input({
  label: "Invoice Number",
  type: "string",
  required: false,
  comments: "Provide a string value for the unique invoice number.",
  placeholder: "Invoice Number",
  example: "INV01",
  clean: cleanStringInput,
});

export const accountCode = input({
  label: "Account Code",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the account code. This value is a customer defined alpha numeric account code.",
  placeholder: "Account Code",
  example: "200",
});

export const accountName = input({
  label: "Account Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the name of the account.",
  placeholder: "Account Name",
  example: "Example Account",
});

export const accountType = input({
  label: "Account Type",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the type of the given account. You can choose from the list of provided values here: https://developer.xero.com/documentation/api/accounting/types#accounts",
  placeholder: "Account Type",
  example: "BANK",
});

export const objectType = input({
  label: "Object Type",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the type of object you would like to access.",
  placeholder: "Object Type",
  model: [
    { label: "Accounts", value: "accounts" },
    { label: "Bank Transactions", value: "banktransactions" },
    { label: "Bank Transfers", value: "banktransfers" },
    { label: "Contacts", value: "contacts" },
    { label: "Credit Notes", value: "creditnotes" },
    { label: "Invoices", value: "invoices" },
    { label: "Manual Journals", value: "manualjournals" },
    { label: "Purchase Orders", value: "purchaseorders" },
    { label: "Receipts", value: "receipts" },
    { label: "Repeating Invoices", value: "repeatinginvoices" },
  ],
});

export const objectId = input({
  label: "Object ID",
  type: "string",
  required: true,
  comments: "Provide a string value for the Id of the object.",
  placeholder: "Object ID",
  example: "example-e40f-414a-8f95-ce6a63196e1a",
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the name of the file you want to attach to the object. The File Name will become the unique identifier of the file for update operations.",
  placeholder: "File Name",
  example: "My Example File",
});

export const file = input({
  label: "File Data",
  type: "data",
  required: true,
  comments:
    "Provide a value that represents the data of the file you want to upload",
  placeholder: "File Data",
  clean: util.types.toBufferDataPayload,
});

export const contentType = input({
  label: "Content Type",
  type: "string",
  required: true,
  comments: "MIME type of the file you want to upload",
  example: "image/png",
  clean: util.types.toString,
});

export const paymentId = input({
  label: "Payment ID",
  type: "string",
  required: true,
  comments: "Provide a string value for the Id of the payment.",
  placeholder: "Payment ID",
  dataSource: "selectPayment",
});

export const paymentAmount = input({
  label: "Payment Amount",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the amount of the payment. This value must be less than or equal to the outstanding amount owed on the invoice.",
  placeholder: "Payment Amount",
});

export const fieldValues = input({
  label: "Optional Values",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments:
    "For each item, provide a key and value to be used in the request body.",
  placeholder: "Optional Values",
  example: "exampleValue",
});

export const bankAccountNumber = input({
  label: "Bank Account Number",
  type: "string",
  required: false,
  comments:
    "This value is required if you are creating an account of type 'BANK'.",
  placeholder: "Bank Account Number",
  example: "121-121-1234567",
});

export const invoiceStatus = input({
  label: "Invoice Status",
  type: "string",
  required: false,
  comments:
    "This value is required if you want to make payments on an invoice. Will default to 'DRAFT'",
  placeholder: "Invoice Status",
  model: [
    { label: "Draft", value: "DRAFT" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Authorized", value: "AUTHORISED" },
  ],
  clean: cleanStringInput,
});

export const enablePaymentsToAccount = input({
  label: "Enable Payments To Account",
  type: "boolean",
  required: false,
  comments: "This flag will enable payments to be made to the given account.",
});

export const page = input({
  label: "Page Number",
  type: "string",
  required: false,
  example: "3",
  comments:
    "Provide the page of the results you would like to return. Pagination will only be enabled if over 100 elements are returned by your request. It is not possible to specify the page size.",
});

export const showInExpenseClaims = input({
  label: "Show In Expense Claims",
  type: "boolean",
  required: false,
  comments:
    "This value will determine if your account will show in expense claims. This field is required for certain accounts.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The connection to use.",
});

export const modifiedAfter = input({
  label: "Modified After",
  type: "string",
  required: false,
  example: "yyyy-mm-ddThhss",
  comments:
    "Only contacts created or modified since this timestamp will be returned.",
});

export const where = input({
  label: "Where",
  type: "string",
  required: false,
  example: `Name.Contains("Peter")`,
  comments:
    "The where parameter allows you to filter on endpoints and elements that don't have explicit parameters.",
});

export const reference = input({
  label: "Reference",
  type: "string",
  required: false,
  comments: "Additional reference number (Accounts Receivable invoices only).",
  placeholder: "REF01",
  example: "REF01",
  clean: cleanStringInput,
});

export const url = input({
  label: "URL",
  type: "string",
  required: false,
  comments: `URL link to a source document – shown as "Go to [appName]" in the Xero app.`,
  placeholder: "https://example.com",
  example: "https://example.com",
  clean: cleanStringInput,
});

export const currencyCode = input({
  label: "Currency Code",
  type: "string",
  required: false,
  comments: "The currency that invoice has been raised in.",
  placeholder: "USD",
  example: "USD",
  clean: cleanStringInput,
});

export const sentToContact = input({
  label: "Sent To Contact",
  type: "boolean",
  required: false,
  comments: `Boolean to set whether the invoice in the Xero app should be marked as "sent". This can be set only on invoices that have been approve.`,
  default: "false",
  clean: util.types.toBool,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  clean: (value: unknown) => cleanCodeInput(value, "Additional Fields"),
});

export const country = input({
  label: "Country",
  type: "string",
  required: false,
  comments: "Provide a string value for the country of the address.",
  example: "United States",
  placeholder: "United States",
  clean: cleanStringInput,
});

export const region = input({
  label: "Region",
  type: "string",
  required: false,
  comments: "Provide a string value for the region of the address.",
  example: "California",
  placeholder: "California",
  clean: cleanStringInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "Turn on to fetch all pages of results. This will ignore the page number input.",
  default: "false",
  clean: util.types.toBool,
});

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of Xero resource to poll for new and updated records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include updated records in trigger results.",
  clean: util.types.toBool,
});
