import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  cursor,
  customerId,
  idempotencyKey,
  limit,
  sortField,
  sortOrder,
  squareConnection,
} from "./common";

const address = input({
  label: "Address",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      address_line_1: "1234 Main Street",
      address_line_2: "Suite 100",
      locality: "San Francisco",
      administrative_district_level_1: "CA",
      postal_code: "94102",
      country: "US",
      first_name: "John",
      last_name: "Doe",
    },
    null,
    2,
  ),
  required: false,
  comments:
    "The customer's mailing address in JSON format. See [Square Address Object](https://developer.squareup.com/reference/square/objects/Address) for field details.",
  clean: (addressInput) => {
    if (!util.types.isJSON(util.types.toString(addressInput))) {
      throw new Error("Invalid JSON provided for Address.");
    }
    return JSON.parse(util.types.toString(addressInput));
  },
});

const birthday = input({
  label: "Birthday",
  type: "string",
  required: false,
  placeholder: "Enter birthday (YYYY-MM-DD)",
  example: "1990-01-15",
  comments: "The customer's date of birth. Format: YYYY-MM-DD.",
  clean: toOptionalString,
});

const companyName = input({
  label: "Company Name",
  type: "string",
  required: false,
  placeholder: "Enter company name",
  example: "Acme Corporation",
  comments: "The name of the company associated with the customer.",
  clean: toOptionalString,
});

const emailAddress = input({
  label: "Email Address",
  type: "string",
  required: false,
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  comments: "The email address of the customer.",
  clean: toOptionalString,
});

const familyName = input({
  label: "Family Name",
  type: "string",
  required: false,
  placeholder: "Enter last name",
  example: "Doe",
  comments: "The last name of the customer.",
  clean: toOptionalString,
});

const givenName = input({
  label: "Given Name",
  type: "string",
  required: false,
  placeholder: "Enter first name",
  example: "John",
  comments: "The first name of the customer.",
  clean: toOptionalString,
});

const nickname = input({
  label: "Nickname",
  type: "string",
  required: false,
  placeholder: "Enter nickname",
  example: "Johnny",
  comments: "An informal name to associate with the customer.",
  clean: toOptionalString,
});

const note = input({
  label: "Note",
  type: "string",
  required: false,
  placeholder: "Enter note",
  example: "Preferred customer - offer special discounts",
  comments: "A free-form note to associate with the customer.",
  clean: toOptionalString,
});

const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  example: "+14155552671",
  comments: "The phone number of the customer in E.164 format (e.g., +14155552671).",
  clean: toOptionalString,
});

const referenceId = input({
  label: "Reference ID",
  type: "string",
  required: false,
  placeholder: "Enter reference ID",
  example: "customer-ref-001",
  comments: "An optional external reference ID to associate with the customer.",
  clean: toOptionalString,
});

const taxIds = input({
  label: "Tax IDs",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      eu_vat: "IE3426675K",
    },
    null,
    2,
  ),
  required: false,
  comments:
    "Tax identification numbers in JSON format. Only applicable for EU countries. See [Square Tax IDs](https://developer.squareup.com/reference/square/objects/TaxIds) for supported formats.",
  clean: (taxIdsInput) => {
    if (!util.types.isJSON(util.types.toString(taxIdsInput))) {
      throw new Error("Invalid JSON provided for Tax IDs.");
    }
    return JSON.parse(util.types.toString(taxIdsInput));
  },
});

const query = input({
  label: "Query",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      query: {
        filter: {
          creation_source: {
            values: ["THIRD_PARTY"],
            rule: "INCLUDE",
          },
          created_at: {
            start_at: "2024-01-01T00:00:00-00:00",
            end_at: "2024-02-01T00:00:00-00:00",
          },
          email_address: {
            fuzzy: "example.com",
          },
          group_ids: {
            all: ["JDKYHBWT1D4F8MFH63DBMEN8Y4"],
          },
        },
        sort: {
          field: "CREATED_AT",
          order: "ASC",
        },
      },
    },
    null,
    2,
  ),
  required: true,
  comments:
    "The query to search for customers. See [Square Search Customers](https://developer.squareup.com/docs/customers-api/use-the-api/search-customers) for filter and sort options.",
  clean: (queryInput) => {
    if (!util.types.isJSON(util.types.toString(queryInput))) {
      throw new Error("Invalid JSON provided for Query.");
    }
    return JSON.parse(util.types.toString(queryInput));
  },
});

export const listCustomersInputs = {
  squareConnection,
  cursor,
  limit,
  sortField,
  sortOrder,
};

export const retrieveCustomerInputs = {
  squareConnection,
  customerId,
};

export const updateCustomerInputs = {
  squareConnection,
  customerId,
  address,
  birthday,
  companyName,
  emailAddress,
  familyName,
  givenName,
  nickname,
  note,
  phoneNumber,
  referenceId,
  taxIds,
};

export const createCustomerInputs = {
  squareConnection,
  address,
  birthday,
  companyName,
  emailAddress,
  familyName,
  givenName,
  nickname,
  note,
  phoneNumber,
  referenceId,
  taxIds,
  idempotencyKey,
};

export const searchCustomersInputs = {
  squareConnection,
  query,
  cursor,
  limit,
};

export const deleteCustomerInputs = {
  squareConnection,
  customerId,
};
