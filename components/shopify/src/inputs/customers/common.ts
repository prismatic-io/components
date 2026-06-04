import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../util";

export const customerIdGql = input({
  label: "Customer",
  type: "string",
  required: true,
  example: "gid://shopify/Customer/5940139491234",
  comments: "The unique ID of the customer.",
  placeholder: "Enter customer ID",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  example: "John",
  placeholder: "Enter first name",
  comments: "The first name of the customer.",
  clean: util.types.toString,
});

export const updateFirstName = input({
  label: "First Name",
  type: "string",
  required: false,
  example: "John",
  placeholder: "Enter first name",
  comments: "The first name of the customer.",
  clean: cleanStringInput,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  example: "Doe",
  placeholder: "Enter last name",
  comments: "The last name of the customer.",
  clean: util.types.toString,
});

export const updateLastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  example: "Doe",
  placeholder: "Enter last name",
  comments: "The last name of the customer.",
  clean: cleanStringInput,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  comments: "The email address of the customer.",
  clean: util.types.toString,
});

export const updateEmail = input({
  label: "Email",
  type: "string",
  required: false,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  comments: "The email address of the customer.",
  clean: cleanStringInput,
});

export const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  example: "+18005555454",
  placeholder: "Enter phone number",
  comments: "The phone number of the customer in E.164 format.",
  clean: cleanStringInput,
});

export const verifiedEmail = input({
  label: "Verified Email",
  type: "boolean",
  required: true,
  default: "false",
  comments: "When true, emails will be sent to the customer.",
  clean: util.types.toBool,
});

export const address = input({
  label: "Address 1",
  type: "string",
  required: false,
  example: "123 Main St",
  placeholder: "Enter street address",
  comments: "The street address.",
  clean: cleanStringInput,
});

export const city = input({
  label: "City",
  type: "string",
  required: false,
  example: "San Jose",
  placeholder: "Enter city",
  comments: "The city name.",
  clean: cleanStringInput,
});

export const province = input({
  label: "Province",
  type: "string",
  required: false,
  example: "California",
  placeholder: "Enter province or state",
  comments: "The province or state name.",
  clean: cleanStringInput,
});

export const zip = input({
  label: "Zipcode",
  type: "string",
  required: false,
  example: "45260",
  placeholder: "Enter zipcode",
  comments: "The postal or zip code.",
  clean: cleanStringInput,
});

export const country = input({
  label: "Country",
  type: "string",
  required: false,
  example: "United States",
  placeholder: "Enter country",
  comments: "The country name.",
  clean: cleanStringInput,
});

export const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  example: "This is an example note.",
  placeholder: "Enter note",
  comments: "Additional notes about the customer.",
  clean: cleanStringInput,
});

export const taxExempt = input({
  label: "Tax Exempt",
  type: "boolean",
  required: false,
  comments: "When true, the customer is tax exempt.",
  clean: util.types.toBool,
});

export const currency = input({
  label: "Currency Format",
  type: "string",
  required: false,
  comments: "The currency format code.",
  placeholder: "Enter currency code",
  example: "USD",
  clean: util.types.toString,
});

export const addressList = input({
  label: "Address List",
  type: "code",
  language: "json",
  comments:
    "A JSON array of address objects for the customer. Each object should include fields like address1, city, province, country, and zip.",
  required: true,
  example: JSON.stringify(
    [
      {
        first_name: "Mother",
        last_name: "Lastnameson",
        company: null,
        address1: "123 Oak St",
        address2: null,
        city: "Ottawa",
        province: "Ontario",
        country: "Canada",
        zip: "123 ABC",
        phone: "555-1212",
        name: "Mother Lastnameson",
        province_code: "ON",
        country_code: "CA",
        country_name: "Canada",
      },
    ],
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const metafields = input({
  label: "Metafields",
  type: "code",
  language: "json",
  comments: "JSON array containing metadata objects.",
  required: false,
  placeholder: "Enter metafields array",
  example: JSON.stringify(
    [
      {
        key: "myKey",
        value: "myValue",
        type: "single_line_text_field",
        namespace: "global",
      },
    ],
    null,
    2,
  ),
  clean: cleanCodeInput,
});
