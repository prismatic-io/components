import { input } from "@prismatic-io/spectral";
import { valueListInputClean } from "../util";

export const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  placeholder: "Enter Contact ID",
  example: "9989223",
  dataSource: "selectContact",
  comments: "The unique identifier of the contact.",
});

export const contactCompany = input({
  label: "Company",
  type: "string",
  required: true,
  example: "Acme Inc.",
  comments: "The company of the contact.",
});

export const contactEmail = input({
  label: "Email",
  type: "string",
  required: true,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  comments:
    "The email of the contact. Getting contacts by email performs a search function and will return a successful output even when no results are found.",
});

export const contactFirstName = input({
  label: "First Name",
  type: "string",
  required: true,
  example: "John",
  comments: "The first name of the contact.",
});

export const contactlastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  example: "Doe",
  comments: "The last name of the contact.",
});

export const phone = input({
  label: "Phone",
  type: "string",
  required: true,
  example: "(877) 929-0687",
  comments: "The phone number.",
});

export const website = input({
  label: "Website",
  type: "string",
  required: true,
  example: "www.example.com",
  comments: "The website URL.",
});

export const contactUpdateCompany = input({
  label: "Company",
  type: "string",
  required: false,
  example: "Acme Inc.",
  comments: "The company of the contact",
});

export const contactUpdateEmail = input({
  label: "Email",
  type: "string",
  required: false,
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  comments: "The email of the contact",
});

export const contactUpdateFirstName = input({
  label: "First Name",
  type: "string",
  required: false,
  example: "John",
  comments: "The first name of the contact",
});

export const contactUpdatelastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  example: "Doe",
  comments: "The last name of the contact",
});

export const updatePhone = input({
  label: "Phone",
  type: "string",
  required: false,
  example: "(877) 929-0687",
  comments: "The phone number of the contact",
});

export const updateWebsite = input({
  label: "Website",
  type: "string",
  required: false,
  example: "www.example.com",
  comments: "The website of the contact",
});

export const contactIds = input({
  label: "Contact Ids",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "A list of contact IDs.",
  dataSource: "selectContact",
  clean: valueListInputClean,
});
