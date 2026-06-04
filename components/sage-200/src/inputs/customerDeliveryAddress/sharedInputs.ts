import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "../../util";

const isDefault = input({
  label: "Is Default",
  comments:
    "Flag to indicate if this is the default customer delivery address for the parent customer.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

const postalName = input({
  label: "Postal Name",
  comments:
    "Postal name is the name of the person or company who the invoice or sales order is addressed to.",
  type: "string",
  required: false,
  example: "Peter Young",
  placeholder: "Peter Young",
  clean: cleanStringInput,
});

const address1 = input({
  label: "Address 1",
  comments: "Address line 1.",
  type: "string",
  required: false,
  example: "1 High Street",
  placeholder: "1 High Street",
  clean: cleanStringInput,
});

const address2 = input({
  label: "Address 2",
  comments: "Address line 2.",
  type: "string",
  required: false,
  example: "2 Low Street",
  placeholder: "2 Low Street",
  clean: cleanStringInput,
});

const address3 = input({
  label: "Address 3",
  comments: "Address line 3.",
  type: "string",
  required: false,
  example: "3 Middle Street",
  placeholder: "3 Middle Street",
  clean: cleanStringInput,
});

const address4 = input({
  label: "Address 4",
  comments: "Address line 4.",
  type: "string",
  required: false,
  example: "4 Side Street",
  placeholder: "4 Side Street",
  clean: cleanStringInput,
});

const city = input({
  label: "City",
  comments: "City (if using segmented addresses in Sage 200 Professional).",
  type: "string",
  required: false,
  example: "Albany",
  placeholder: "Albany",
  clean: cleanStringInput,
});

const county = input({
  label: "County",
  comments: "County (if using segmented addresses in Sage 200 Professional).",
  type: "string",
  required: false,
  example: "Brown County",
  placeholder: "Brown County",
  clean: cleanStringInput,
});

const postcode = input({
  label: "Postcode",
  comments: "Postcode.",
  type: "string",
  required: false,
  example: "12345",
  placeholder: "12345",
  clean: cleanStringInput,
});

const addressCountryCodeId = input({
  label: "Address Country Code Id",
  comments:
    "Country code Id. See [Sage 200 API documentation](https://developer.sage.com/200/reference/country_codes) for more information.",
  type: "string",
  required: false,
  example: "0",
  placeholder: "0",
  clean: cleanNumberInput,
});

const contact = input({
  label: "Contact",
  comments: "The contact associated with the customer delivery address.",
  type: "string",
  required: false,
  example: "Peter Young",
  placeholder: "Peter Young",
  clean: cleanStringInput,
});

const telephone = input({
  label: "Telephone",
  comments: "The telephone number associated with the customer delivery address.",
  type: "string",
  required: false,
  example: "08976 656 878",
  placeholder: "08976 656 878",
  clean: cleanStringInput,
});

const fax = input({
  label: "Fax",
  comments: "The fax number associated with the customer delivery address.",
  type: "string",
  required: false,
  example: "08976 656 878",
  placeholder: "08976 656 878",
  clean: cleanStringInput,
});

const email = input({
  label: "Email",
  comments: "The email address associated with the customer delivery address.",
  type: "string",
  required: false,
  example: "pyoung@hobotmail.com",
  placeholder: "pyoung@hobotmail.com",
  clean: cleanStringInput,
});

const taxNumber = input({
  label: "Tax Number",
  comments: "The tax number.",
  type: "string",
  required: false,
  example: "9NN-NN-NNNN",
  placeholder: "9NN-NN-NNNN",
  clean: cleanStringInput,
});

const countryCodeId = input({
  label: "Country Code Id",
  comments:
    "VAT details Country code Id. See [Sage 200 API documentation](https://developer.sage.com/200/reference/country_codes) for more information.",
  type: "string",
  required: false,
  example: "13",
  placeholder: "13",
  clean: cleanNumberInput,
});

export default {
  isDefault,
  postalName,
  address1,
  address2,
  address3,
  address4,
  city,
  county,
  postcode,
  addressCountryCodeId,
  contact,
  telephone,
  fax,
  email,
  taxNumber,
  countryCodeId,
};
