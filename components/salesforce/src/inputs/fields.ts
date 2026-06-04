import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const firstName = input({
  label: "First Name",
  placeholder: "Enter first name",
  type: "string",
  required: false,
  comments: "The first name of the contact at the company",
  example: "John",
  clean: cleanStringInput,
});
export const lastName = input({
  label: "Last Name",
  placeholder: "Enter last name",
  type: "string",
  required: false,
  comments: "The last name of the contact at the company",
  example: "Smith",
  clean: cleanStringInput,
});

export const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  comments: "The primary phone number for the object.",
  example: "18005555555",
  clean: cleanStringInput,
});

export const mobile = input({
  label: "Mobile Phone",
  type: "string",
  required: false,
  placeholder: "Enter mobile phone number",
  comments: "The mobile phone number for the object.",
  example: "18005555555",
  clean: cleanStringInput,
});

export const email = input({
  label: "Email Address",
  type: "string",
  required: true,
  placeholder: "Enter email address",
  comments: "The email address for the object.",
  example: "someone@example.com",
  clean: util.types.toString,
});

export const title = input({
  label: "Title",
  type: "string",
  required: false,
  placeholder: "Enter title",
  comments: "The job title or professional title associated with the contact or lead.",
  example: "Example Title",
  clean: cleanStringInput,
});

export const street = input({
  label: "Street Address",
  type: "string",
  required: false,
  placeholder: "Enter street address",
  comments: "The street address of the object.",
  example: "4 Privet Drive",
  clean: cleanStringInput,
});

export const state = input({
  label: "State",
  type: "string",
  required: false,
  placeholder: "Enter state",
  comments: "The state of the object's address.",
  example: "CA",
  clean: cleanStringInput,
});
export const country = input({
  label: "Country",
  type: "string",
  required: false,
  placeholder: "Enter country",
  comments: "The country of the object's address.",
  example: "United States",
  clean: cleanStringInput,
});

export const city = input({
  label: "City",
  type: "string",
  required: false,
  placeholder: "Enter city",
  comments: "The city of the object's address.",
  example: "Cupertino",
  clean: cleanStringInput,
});

export const postalCode = input({
  label: "Postal Code",
  type: "string",
  required: false,
  placeholder: "Enter postal code",
  comments: "The zip code of the object's address.",
  example: "94024",
  clean: cleanStringInput,
});

export const leadSource = input({
  label: "Lead Source",
  type: "string",
  required: false,
  placeholder: "Enter lead source",
  comments: "The origin or channel from which the lead was generated (e.g., Web, Phone, Email).",
  example: "Web",
  clean: cleanStringInput,
});

export const revenue = input({
  label: "Annual Revenue",
  type: "string",
  required: false,
  placeholder: "Enter annual revenue",
  comments: "The estimated annual revenue of the account, in the organization's default currency.",
  example: "38000",
  clean: cleanStringInput,
});

export const fax = input({
  label: "Fax",
  type: "string",
  required: false,
  placeholder: "Enter fax number",
  comments: "The fax number associated with the record.",
  example: "18008999372",
  clean: cleanStringInput,
});

export const website = input({
  label: "Website",
  type: "string",
  required: false,
  placeholder: "Enter website URL",
  comments: "The website URL associated with the record.",
  example: "website-example.com",
  clean: cleanStringInput,
});

export const billingStreet = input({
  label: "Billing Street Address",
  type: "string",
  required: false,
  placeholder: "Enter billing street address",
  comments: "The street address of the billing object.",
  example: "4 Privet Drive",
  clean: cleanStringInput,
});

export const billingState = input({
  label: "Billing State",
  type: "string",
  required: false,
  placeholder: "Enter billing state",
  comments: "The state of the object's billing address.",
  example: "CA",
  clean: cleanStringInput,
});

export const billingCity = input({
  label: "Billing City",
  type: "string",
  required: false,
  placeholder: "Enter billing city",
  comments: "The city of the object's billing address.",
  example: "Cupertino",
  clean: cleanStringInput,
});

export const billingPostalCode = input({
  label: "Billing Postal Code",
  type: "string",
  required: false,
  placeholder: "Enter billing postal code",
  comments: "The zip code of the object's billing address.",
  example: "94024",
  clean: cleanStringInput,
});

export const billingCountry = input({
  label: "Billing Country",
  type: "string",
  required: false,
  placeholder: "Enter billing country",
  comments: "The country of the object's billing address.",
  example: "CA",
  clean: cleanStringInput,
});

export const employeeCount = input({
  label: "Number of Employees",
  type: "string",
  required: false,
  placeholder: "Enter number of employees",
  comments: "The number of employees associated with the object.",
  example: "30",
  clean: cleanStringInput,
});

export const accountId = input({
  label: "Account ID",
  type: "string",
  required: false,
  placeholder: "Enter account ID",
  comments: "The ID of the account to reference.",
  example: "0017000000hOMChAAO",
  clean: cleanStringInput,
});

export const company = input({
  label: "Company",
  placeholder: "Enter company name",
  type: "string",
  required: true,
  comments: "The name of the company associated with the record.",
  example: "Widgets Inc.",
  clean: util.types.toString,
});

export const leadStatus = input({
  label: "Lead Status",
  type: "string",
  required: true,
  placeholder: "Enter lead status",
  example: "Converted",
  comments:
    "The status of the lead. Examples of valid values include: Open, Working, Closed - Converted, Closed - Not Converted.",
  clean: util.types.toString,
});

export const rating = input({
  label: "Rating",
  type: "string",
  placeholder: "Select rating",
  model: [
    { label: "--None--", value: "none" },
    {
      label: "Hot",
      value: "Hot",
    },
    {
      label: "Warm",
      value: "Warm",
    },
    {
      label: "Cold",
      value: "Cold",
    },
  ],
  required: false,
  comments: "The rating for the lead.",
  clean: cleanStringInput,
});

export const birthdate = input({
  label: "Birthdate",
  type: "string",
  required: false,
  placeholder: "Enter birthdate (YYYY-MM-DD)",
  comments: "The birthdate of the contact. Format: YYYY-MM-DD.",
  example: "1985-06-15",
  clean: cleanStringInput,
});

export const industry = input({
  label: "Industry",
  type: "string",
  required: true,
  placeholder: "Select industry",
  model: [
    { label: "--None--", value: "none" },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Apparel", value: "Apparel" },
    { label: "Banking", value: "Banking" },
    { label: "Biotechnology", value: "Biotechnology" },
    { label: "Chemicals", value: "Chemicals" },
    { label: "Communications", value: "Communications" },
    { label: "Construction", value: "Construction" },
    { label: "Consulting", value: "Consulting" },
    { label: "Education", value: "Education" },
    { label: "Electronics", value: "Electronics" },
    { label: "Energy", value: "Energy" },
    { label: "Engineering", value: "Engineering" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Environmental", value: "Environmental" },
    { label: "Finance", value: "Finance" },
    { label: "Food & Beverage", value: "Food & Beverage" },
    { label: "Government", value: "Government" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "Insurance", value: "Insurance" },
    { label: "Machinery", value: "Machinery" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Media", value: "Media" },
    { label: "Not For Profit", value: "Not For Profit" },
    { label: "Other", value: "Other" },
    { label: "Recreation", value: "Recreation" },
    { label: "Retail", value: "Retail" },
    { label: "Shipping", value: "Shipping" },
    { label: "Technology", value: "Technology" },
    { label: "Telecommunications", value: "Telecommunications" },
    { label: "Transportation", value: "Transportation" },
    { label: "Utilities", value: "Utilities" },
  ],
  comments: "The industry of the account record.",
  clean: util.types.toString,
});

export const type = input({
  label: "Account Type",
  type: "string",
  required: true,
  placeholder: "Select account type",
  model: [
    { label: "--None--", value: "none" },
    { label: "Analyst", value: "Analyst" },
    { label: "Competitor", value: "Competitor" },
    { label: "Customer", value: "Customer" },
    { label: "Integrator", value: "Integrator" },
    { label: "Investor", value: "Investor" },
    { label: "Partner", value: "Partner" },
    { label: "Press", value: "Press" },
    { label: "Product", value: "Product" },
    { label: "Reseller", value: "Reseller" },
    { label: "Other", value: "Other" },
  ],
  comments: "The type of account record.",
  clean: util.types.toString,
});
