import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../utils";

export const companyDisplayName = input({
  label: "Display Name",
  comments: "The name of the company as it should be displayed to users.",
  type: "string",
  example: "CRONUS USA, Inc.",
  placeholder: "CRONUS USA, Inc.",
  required: false,
  clean: cleanStringInput,
});

export const companyAddressLine1 = input({
  label: "Address Line 1",
  comments: "The first line of the company's address.",
  example: "7122 South Ashford Street",
  placeholder: "7122 South Ashford Street",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyAddressLine2 = input({
  label: "Address Line 2",
  comments: "The second line of the company's address.",
  example: "Westminster",
  placeholder: "Westminster",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyCity = input({
  label: "City",
  comments: "The city where the company is located.",
  example: "Atlanta",
  placeholder: "Atlanta",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyState = input({
  label: "State",
  comments: "The state where the company is located.",
  example: "GA",
  placeholder: "GA",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyCountry = input({
  label: "Country",
  comments: "The country where the company is located.",
  example: "US",
  placeholder: "US",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyPostalCode = input({
  label: "Postal Code",
  comments: "The postal code of the company's address.",
  example: "31772",
  placeholder: "31772",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyPhoneNumber = input({
  label: "Phone Number",
  comments: "The company's phone number.",
  example: "+1 425 555 0100",
  placeholder: "+1 425 555 0100",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyFaxNumber = input({
  label: "Fax Number",
  example: "+1 425 555 0101",
  comments: "The company's fax number.",
  placeholder: "+1 425 555 0101",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyEmail = input({
  label: "Email",
  example: "example@gmail.com",
  placeholder: "example@gmail.com",
  comments: "The company's email address.",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyWebsite = input({
  label: "Website",
  comments: "The company's website URL.",
  example: "www.sample.com",
  placeholder: "www.sample.com",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyTaxRegistrationNumber = input({
  label: "Tax Registration Number",
  example: "f80b7995-6869-4958-ac60-25e4fcdeeada",
  placeholder: "f80b7995-6869-4958-ac60-25e4fcdeeada",
  comments: "The company's tax registration number.",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyCurrencyCode = input({
  label: "Currency Code",
  comments: "The currency code used by the company.",
  example: "USD",
  placeholder: "USD",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyCurrentFiscalYearStartDate = input({
  label: "Current Fiscal Year Start Date",
  comments: "The start date of the company's current fiscal year.",
  example: "2021-01-01",
  placeholder: "2021-01-01",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyIndustry = input({
  label: "Industry",
  example: "yourIndustryHere",
  placeholder: "yourIndustryHere",
  comments: "The industry in which the company operates.",
  required: false,
  type: "string",
  clean: cleanStringInput,
});

export const companyInformationId = input({
  label: "Company Information ID",
  comments: "The unique identifier of the company information object.",
  example: "f80b7995-6869-4958-ac60-25e4fcdeeada",
  placeholder: "f80b7995-6869-4958-ac60-25e4fcdeeada",
  required: true,
  type: "string",
  clean: util.types.toString,
});
