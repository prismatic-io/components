import { input } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanNumberInput,
  cleanStringInput,
  mapBooleanModelInput,
  mapModelValues,
} from "../util";
import {
  active,
  address,
  connection,
  contacts,
  customerId,
  customerType,
  customFields,
  customQueryParams,
  externalData,
  fetchAll,
  includeTotal,
  memo,
  modifiedBefore,
  modifiedOnOrAfter,
  name,
  pagination,
  sort,
  tagTypeIds,
} from "./common";
const location = input({
  label: "Location",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        name: "string",
        address: {
          street: "string",
          unit: "string",
          city: "string",
          state: "string",
          zip: "string",
          country: "string",
          latitude: 0,
          longitude: 0,
        },
        contacts: [
          {
            type: {},
            value: "string",
            memo: "string",
          },
        ],
        customFields: [
          {
            typeId: 0,
            value: "string",
          },
        ],
        tagTypeIds: [0],
        externalData: {
          applicationGuid: "string",
          externalData: [
            {
              key: "string",
              value: "string",
            },
          ],
        },
      },
    ],
    null,
    2,
  ),
  comments: "Locations for the customer",
  clean: cleanCodeInput,
});
const doNotMail = input({
  label: "Do Not Mail",
  type: "string",
  required: false,
  comments: "Customer has been flagged as \u201cdo not mail\u201d",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
const doNotService = input({
  label: "Do Not Service",
  type: "string",
  required: false,
  comments: "Customer has been flagged as \u201cdo not service\u201d",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
export const customerContactId = input({
  label: "Customer Contact ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The customer contact ID.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectCustomerContact",
});
const customerContactType = input({
  label: "Customer Contact Type",
  type: "string",
  required: true,
  comments: "Type of the customer contact",
  model: mapModelValues(["Phone", "Email", "Fax", "MobilePhone"], true),
  default: "",
  clean: cleanStringInput,
});
const customerContactTypeValue = input({
  label: "Customer Contact Type Value",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "The email, phone number, or fax number for the contact",
  placeholder: "1234567890",
  clean: cleanStringInput,
});
export const createCustomerInputs = {
  connection,
  name,
  locations: { ...location, required: true },
  address: {
    ...address,
    required: true,
    comments: "Bill-To address of the customer record",
  },
  type: customerType,
  doNotMail,
  doNotService,
  contacts,
  customFields,
  tagTypeIds,
  externalData,
};
export const getCustomerInputs = {
  connection,
  customerId,
};
export const listCustomersInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  includeTotal,
  customQueryParams,
};
export const updateCustomerInputs = {
  connection,
  customerId,
  name: {
    ...name,
    required: false,
  },
  type: customerType,
  address,
  customFields,
  externalData,
  doNotMail,
  doNotService,
  active: {
    ...active,
    required: false,
    comments: "Whether the customer is active",
  },
  tagTypeIds,
};
export const createCustomerContactInputs = {
  connection,
  customerId,
  type: customerContactType,
  value: customerContactTypeValue,
  memo: {
    ...memo,
    required: false,
    comments:
      "Short description about this contact, for example, \u201cwork #\u201d or \u201cOwner\u2019s daughter - Kelly\u201d",
  },
};
export const deleteCustomerContactInputs = {
  connection,
  customerId,
  customerContactId,
};
export const listCustomersContactInputs = {
  connection,
  customerId,
  fetchAll,
  pagination,
  includeTotal,
  modifiedBefore,
  modifiedOnOrAfter,
};
export const updateCustomerContactInputs = {
  connection,
  customerId,
  customerContactId,
  type: { ...customerContactType, required: false },
  value: { ...customerContactTypeValue, required: false },
  memo: {
    ...memo,
    required: false,
    comments:
      "Short description about this contact, for example, \u201cwork #\u201d or \u201cOwner\u2019s daughter - Kelly\u201d",
  },
};
