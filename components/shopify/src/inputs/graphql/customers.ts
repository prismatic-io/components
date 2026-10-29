import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanStringInput,
  cleanValueListInput,
} from "../../util";
import {
  additionalFields,
  customerIdGql,
  getAlldata,
  optionalBoolean,
  pagination,
  shopifyConnection,
  tags,
  taxExempt,
} from "./common";

const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  example: "John",
  placeholder: "Enter first name",
  comments: "The first name of the customer.",
  clean: util.types.toString,
});

const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  example: "Doe",
  placeholder: "Enter last name",
  comments: "The last name of the customer.",
  clean: util.types.toString,
});

const email = input({
  label: "Email",
  type: "string",
  required: true,
  example: "someone@example.com",
  placeholder: "Enter email address",
  comments: "The email address of the customer.",
  clean: util.types.toString,
});

const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  example: "+18005555454",
  placeholder: "Enter phone number",
  comments: "The phone number of the customer.",
  clean: cleanStringInput,
});

const addressListGql = input({
  label: "Address List",
  type: "code",
  language: "json",
  comments: "Provide a JSON array containing address objects.",
  required: false,
  example: JSON.stringify([
    {
      address1: "",
      address2: "",
      city: "",
      company: "",
      countryCode: "",
      firstName: "",
      lastName: "",
      phone: "",
      provinceCode: "",
      zip: "",
    },
  ]),
  clean: (value) => cleanArrayCodeInput(value, "Address List"),
});

const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  example: "This is an example note.",
  placeholder: "Enter note",
  comments: "A note about the customer.",
  clean: cleanStringInput,
});

const metafields = input({
  label: "Metafields",
  type: "code",
  language: "json",
  comments: "Provide a JSON array containing metadata objects.",
  required: false,
  example: JSON.stringify([
    {
      key: "myKey",
      value: "myValue",
      type: "single_line_text_field",
      namespace: "global",
    },
  ]),
  clean: (value) => cleanArrayCodeInput(value, "Metafields"),
});

export const countCustomersInputs = {
  shopifyConnection,
};

export const createAccountActivationURLInputs = {
  shopifyConnection,
  customerIdGql,
};

export const createCustomerInputs = {
  shopifyConnection,
  firstName,
  lastName,
  email,
  addressListGql,
  phone,
  notes,
  tags,
  taxExempt,
  metafields,
  additionalFields,
};

export const updateCustomerInputs = {
  shopifyConnection,
  customerIdGql,
  firstName: input({
    ...firstName,
    required: false,
    clean: cleanStringInput,
  }),
  lastName: input({
    ...lastName,
    required: false,
    clean: cleanStringInput,
  }),
  email: input({
    ...email,
    required: false,
    clean: cleanStringInput,
  }),
  addressListGql,
  phone,
  notes,
  tags: input({
    ...tags,
    clean: (value: unknown) => cleanValueListInput(value, true),
  }),
  taxExempt: input({
    ...taxExempt,
    ...optionalBoolean,
    label: "Tax Exempt",
  }),
  metafields,
  additionalFields,
};

export const deleteCustomerInputs = {
  shopifyConnection,
  customerIdGql,
};

export const getCustomerInputs = {
  shopifyConnection,
  customerIdGql,
};

export const listCustomersInputs = {
  shopifyConnection,
  getAlldata,
  pagination,
};
