import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connection } from "./common";

export const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  comments: "The external account number (int) or account ID GUID.",
  example: "23233123",
  placeholder: "Enter Account ID",
  clean: util.types.toString,
});

const accountName = input({
  label: "Account Name",
  type: "string",
  required: false,
  comments: "The account name for the new account.",
  example: "My Account Name",
  placeholder: "Enter account name",
  clean: cleanString,
});

const distributorCode = input({
  label: "Distributor Code",
  type: "string",
  required: false,
  comments:
    "The distributor code issued by DocuSign for partner account provisioning.",
  example: "DEVCENTER_DEMO_APRIL2013",
  placeholder: "Enter distributor code",
  clean: cleanString,
});

const distributorPassword = input({
  label: "Distributor Password",
  type: "string",
  required: false,
  comments: "The password for the Distributor Code.",
  placeholder: "Enter distributor password",
  clean: cleanString,
});

const email = input({
  label: "Email",
  type: "string",
  required: false,
  comments: "The user's email address.",
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: cleanString,
});

const firstName = input({
  label: "First Name",
  type: "string",
  comments: "The user's first name. Maximum Length: 50 characters.",
  example: "John",
  placeholder: "Enter first name",
  required: false,
  clean: cleanString,
});

const middleName = input({
  label: "Middle Name",
  type: "string",
  comments: "The user's middle name. Maximum Length: 50 characters.",
  example: "Jacob",
  placeholder: "Enter middle name",
  required: false,
  clean: cleanString,
});

const lastName = input({
  label: "Last Name",
  type: "string",
  comments: "The user's last name. Maximum Length: 50 characters.",
  example: "Doe",
  placeholder: "Enter last name",
  required: false,
  clean: cleanString,
});

const suffixName = input({
  label: "Suffix Name",
  type: "string",
  comments: "The suffix for the user's name. Maximum Length: 50 characters.",
  example: "Jr.",
  placeholder: "Enter suffix",
  required: false,
  clean: cleanString,
});

const userName = input({
  label: "User Name",
  type: "string",
  comments: "The full name of the initial user created on the new account.",
  example: "John Doe",
  placeholder: "Enter user name",
  required: false,
  clean: cleanString,
});

const jobTitle = input({
  label: "Job Title",
  type: "string",
  comments: "The user's job title.",
  example: "Software Engineer",
  placeholder: "Enter job title",
  required: false,
  clean: cleanString,
});

const company = input({
  label: "Company",
  type: "string",
  comments: "The name of the user's company.",
  example: "Acme Corporation",
  placeholder: "Enter company name",
  required: false,
  clean: cleanString,
});

const address1 = input({
  label: "Street Address",
  type: "string",
  comments: "The first line of the address. Maximum length: 100 characters.",
  example: "123 Main St",
  placeholder: "Enter address line 1",
  required: false,
  clean: cleanString,
});

const address2 = input({
  label: "Street Address Line 2",
  type: "string",
  comments: "The second line of the address. Maximum length: 100 characters.",
  example: "Suite 100",
  placeholder: "Enter address line 2",
  required: false,
  clean: cleanString,
});

const city = input({
  label: "City",
  type: "string",
  comments:
    "The city associated with the address. Maximum length: 40 characters.",
  example: "San Francisco",
  placeholder: "Enter city",
  required: false,
  clean: cleanString,
});

const state = input({
  label: "State",
  type: "string",
  comments:
    "The state or province associated with the address. Maximum length: 40 characters.",
  example: "California",
  placeholder: "Enter state or province",
  required: false,
  clean: cleanString,
});

const postalCode = input({
  label: "Postal Code",
  type: "string",
  comments:
    "The postal code associated with the address. Maximum length: 20 characters.",
  example: "94105",
  placeholder: "Enter postal code",
  required: false,
  clean: cleanString,
});

const country = input({
  label: "Country",
  type: "string",
  comments:
    "The country associated with the address. Maximum length: 50 characters.",
  example: "United States",
  placeholder: "Enter country",
  required: false,
  clean: cleanString,
});

const phone = input({
  label: "Phone",
  type: "string",
  comments: "The account's primary phone number, including country code.",
  example: "+1-555-123-4567",
  placeholder: "Enter phone number",
  required: false,
  clean: cleanString,
});

const fax = input({
  label: "Fax",
  type: "string",
  comments: "The account's fax number, including country code.",
  example: "+1-555-123-4567",
  placeholder: "Enter fax number",
  required: false,
  clean: cleanString,
});

const planId = input({
  label: "Plan ID",
  type: "string",
  required: false,
  comments: "DocuSign's ID for the account plan.",
  placeholder: "Enter Plan ID",
  clean: cleanString,
});

const includedSeats = input({
  label: "Included Seats",
  type: "string",
  required: false,
  comments: "The number of seats (users) included in the plan.",
  example: "10",
  placeholder: "Enter number of seats",
  clean: cleanString,
});

const referralCode = input({
  label: "Referral Code",
  type: "string",
  required: false,
  comments: "The referral code to apply to the new account.",
  placeholder: "Enter referral code",
  clean: cleanString,
});

const referrerName = input({
  label: "Referrer Name",
  type: "string",
  comments: "The name of the person or partner who referred the new account.",
  placeholder: "Enter referrer name",
  required: false,
  clean: cleanString,
});

const initialUser = structuredObjectInput({
  label: "Initial User",
  required: false,
  comments: "Email, name, user name, job title, and company of the first user.",
  inputs: {
    email,
    firstName,
    middleName,
    lastName,
    suffixName,
    userName,
    jobTitle,
    company,
  },
});

const address = structuredObjectInput({
  label: "Address",
  required: false,
  comments: "Street, city, state, postal code, and country.",
  inputs: { address1, address2, city, state, postalCode, country },
});

export const createAccountInputs = {
  connection,
  accountName,
  initialUser,
  address,
  phone,
  fax,
  includedSeats,
  planId,
  referralCode,
  referrerName,
  distributorCode,
  distributorPassword,
};

export const deleteAccountInputs = {
  connection,
  accountId,
};

export const getAccountInputs = {
  connection,
  accountId,
};

export const listAccountSettingsInputs = {
  connection,
  accountId,
};
