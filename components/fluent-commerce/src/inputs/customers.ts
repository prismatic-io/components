import { input, util } from "@prismatic-io/spectral";
import { toOptionalString, toStringAttributes } from "../util";
import { connectionInput } from "./common";

const retailerId = input({
  label: "Retailer ID",
  type: "string",
  example: "34",
  placeholder: "Enter retailer ID",
  required: true,
  clean: util.types.toString,
  comments: "The ID of the retailer (a number)",
});

const customerEmail = input({
  label: "Customer Email",
  type: "string",
  example: "test@example.com",
  placeholder: "Enter customer email",
  required: true,
  clean: util.types.toString,
  comments: "The email address of the customer",
});

const firstName = input({
  label: "First Name",
  type: "string",
  example: "John",
  placeholder: "Enter first name",
  required: true,
  clean: util.types.toString,
  comments: "The first name of the customer (required)",
});

const lastName = input({
  label: "Last Name",
  type: "string",
  example: "Doe",
  placeholder: "Enter last name",
  required: false,
  clean: toOptionalString,
  comments: "The last name of the customer",
});

const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  example: "+61412345678",
  placeholder: "Enter phone number",
  required: false,
  clean: toOptionalString,
  comments: "The customer's phone number",
});

const country = input({
  label: "Country",
  type: "string",
  example: "Australia",
  placeholder: "Enter country",
  required: false,
  clean: toOptionalString,
  comments: "The customer's country",
});

const timezone = input({
  label: "Time Zone",
  type: "string",
  example: "UTC+5",
  placeholder: "Enter time zone",
  required: false,
  clean: toOptionalString,
  comments: "The customer's time zone",
});

const promotionOptIn = input({
  label: "Promotion Opt In",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
  comments:
    "When true, the customer is opted in to receive promotional communications.",
});

const attributes = input({
  label: "Attributes",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  clean: toStringAttributes,
  comments:
    "Custom attributes to apply to the customer. Each key becomes the attribute name, and each value is stored as a STRING attribute.",
});

const emailAddress = input({
  label: "Customer Email Address",
  type: "string",
  example: "test@example.com",
  placeholder: "Enter customer email address",
  required: true,
  clean: util.types.toString,
  comments: "The customer's email address",
});

export const createCustomerInputs = {
  connection: connectionInput,
  retailerId,
  customerEmail,
  firstName,
  promotionOptIn,
  lastName,
  phoneNumber,
  country,
  timezone,
  attributes,
};

export const getCustomerByEmailAddressInputs = {
  connection: connectionInput,
  emailAddress,
};
