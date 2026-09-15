import { input } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanCodeInput,
  mapBooleanModelInput,
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
  example: JSON.stringify(
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
