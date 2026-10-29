import { input, util } from "@prismatic-io/spectral";
import { createContactAdditionalFields } from "../constants";
import { cleanStringInput } from "../util";
import {
  additionalFields,
  connectionInput,
  contactId,
  fetchAll,
  modifiedAfter,
  page,
  where,
} from "./common";

export const contactName = input({
  label: "Contact Name",
  type: "string",
  required: true,
  comments: "The full name or business name of the contact.",
  example: "Acme Inc.",
  placeholder: "Enter contact name",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The given name of the contact.",
  example: "John",
  placeholder: "Enter first name",
  clean: cleanStringInput,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The family name of the contact.",
  example: "Doe",
  placeholder: "Enter last name",
  clean: cleanStringInput,
});

export const email = input({
  label: "Email Address",
  type: "string",
  required: false,
  comments: "The email address used to reach the contact.",
  example: "someone@example.com",
  placeholder: "Enter email address",
  clean: cleanStringInput,
});

export const bankAccountDetails = input({
  label: "Bank Account Details",
  type: "string",
  required: false,
  comments:
    "The bank account number for the contact. Depending on the account type, providing a value here could cause the request to fail. See the [Xero accounts documentation](https://developer.xero.com/documentation/api/accounting/accounts/#get-accounts) for the expected shape.",
  example: "01-0123-example-00",
  placeholder: "Enter bank account details",
  clean: cleanStringInput,
});

export const taxNumber = input({
  label: "Tax Number",
  type: "string",
  required: false,
  comments:
    "The tax number of the contact. See the [Xero tax types](https://developer.xero.com/documentation/api/accounting/types#tax-types) for accepted values.",
  example: "12-345-678",
  placeholder: "Enter tax number",
  clean: cleanStringInput,
});

export const accountsReceivableTaxType = input({
  label: "Accounts Receivable Tax Type",
  type: "string",
  required: false,
  comments:
    "The default tax type applied to sales invoices for the contact. See the [Xero tax types](https://developer.xero.com/documentation/api/accounting/types#tax-types) for accepted values.",
  example: "OUTPUT",
  placeholder: "Enter accounts receivable tax type",
  clean: cleanStringInput,
});

export const accountsPayableTaxType = input({
  label: "Accounts Payable Tax Type",
  type: "string",
  required: false,
  comments:
    "The default tax type applied to bills for the contact. See the [Xero tax types](https://developer.xero.com/documentation/api/accounting/types#tax-types) for accepted values.",
  example: "OUTPUT",
  placeholder: "Enter accounts payable tax type",
  clean: cleanStringInput,
});

export const defaultCurrency = input({
  label: "Default Currency",
  type: "string",
  required: false,
  comments: "The default currency code used for the contact.",
  example: "USD",
  placeholder: "Enter default currency",
  clean: cleanStringInput,
});

export const contactNumber = input({
  label: "Contact Number",
  type: "string",
  required: false,
  comments: "A unique number that identifies the contact.",
  example: "IDexample01",
  placeholder: "Enter contact number",
  clean: cleanStringInput,
});

export const contactStatus = input({
  label: "Contact Status",
  type: "string",
  required: false,
  comments: "The status to assign to the contact.",
  model: [
    { label: "Active", value: "ACTIVE" },
    { label: "Archived", value: "ARCHIVED" },
    { label: "GDP Request", value: "GDPREQUEST" },
  ],
  placeholder: "Enter contact status",
  clean: cleanStringInput,
});

export const city = input({
  label: "City",
  type: "string",
  required: false,
  comments: "The city portion of the contact's address.",
  example: "San Francisco",
  placeholder: "Enter city",
  clean: cleanStringInput,
});

export const addressType = input({
  label: "Address Type",
  type: "string",
  required: false,
  comments: "The kind of address being provided.",
  example: "POBOX",
  model: [
    { label: "PO Box", value: "POBOX" },
    { label: "Street", value: "STREET" },
    { label: "Delivery", value: "DELIVERY" },
  ],
  placeholder: "Enter address type",
  clean: cleanStringInput,
});

export const address = input({
  label: "Address",
  type: "string",
  required: false,
  comments: "The street address of the contact.",
  example: "4 Privet Drive",
  placeholder: "Enter address",
  clean: cleanStringInput,
});

export const postalCode = input({
  label: "Postal Code",
  type: "string",
  required: false,
  comments: "The postal or ZIP code of the contact's address.",
  example: "48423",
  placeholder: "Enter postal code",
  clean: cleanStringInput,
});

export const country = input({
  label: "Country",
  type: "string",
  required: false,
  comments: "The country portion of the contact's address.",
  example: "United States",
  placeholder: "Enter country",
  clean: cleanStringInput,
});

export const region = input({
  label: "Region",
  type: "string",
  required: false,
  comments: "The state or region portion of the contact's address.",
  example: "California",
  placeholder: "Enter region",
  clean: cleanStringInput,
});

const contactAdditionalFields = input({
  ...additionalFields,
  example: JSON.stringify(createContactAdditionalFields, null, 2),
  comments:
    additionalFields.comments +
    " See [Xero API documentation](https://developer.xero.com/documentation/api/accounting/contacts#post-contacts) for additional fields.",
});

export const archiveContactInputs = {
  xeroConnection: connectionInput,
  contactId,
};

export const createContactInputs = {
  xeroConnection: connectionInput,
  contactName,
  firstName,
  lastName,
  email,
  addressType,
  address,
  city,
  postalCode,
  country,
  region,
  bankAccountDetails,
  contactStatus,
  taxNumber,
  accountsReceivableTaxType,
  accountsPayableTaxType,
  defaultCurrency,
  additionalFields: contactAdditionalFields,
};

export const getContactInputs = {
  xeroConnection: connectionInput,
  contactId,
};

export const getContactHistoryInputs = {
  xeroConnection: connectionInput,
  contactId,
};

export const listContactsInputs = {
  xeroConnection: connectionInput,
  fetchAll,
  page,
  modifiedAfter,
  where,
};

export const updateContactInputs = {
  xeroConnection: connectionInput,
  contactId,
  contactNumber,
  contactName: { ...contactName, required: false },
  firstName,
  lastName,
  email,
  accountsPayableTaxType,
  accountsReceivableTaxType,
  bankAccountDetails,
  defaultCurrency,
  taxNumber,
  contactStatus,
  city,
  addressType,
  address,
  postalCode,
  country,
  region,
  additionalFields: contactAdditionalFields,
};
