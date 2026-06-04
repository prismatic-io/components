import { connection, webinarKey } from "../general";
import { input, util } from "@prismatic-io/spectral";
import {
  toOptionalNumber,
  toOptionalObject,
  toOptionalString,
} from "../../utils";

export const firstName = input({
  label: "First Name",
  comments: "The first name of the registrant.",
  type: "string",
  required: true,
  example: "John",
  placeholder: "John",
  clean: util.types.toString,
});

export const lastName = input({
  label: "Last Name",
  comments: "The last name of the registrant.",
  type: "string",
  required: true,
  example: "Doe",
  placeholder: "Doe",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  comments: "The email address of the registrant.",
  type: "string",
  required: true,
  example: "johndoe@testemail.com",
  placeholder: "johndoe@testemail.com",
  clean: util.types.toString,
});

export const source = input({
  label: "Source",
  comments:
    "The source that led to the registration. " +
    "This can be any string like 'Newsletter 123' or 'Marketing campaign ABC'",
  type: "string",
  required: false,
  example: "website",
  placeholder: "website",
  clean: toOptionalString,
});

export const address = input({
  label: "Address",
  comments: "The address of the registrant.",
  type: "string",
  required: false,
  example: "123 Main St",
  placeholder: "123 Main St",
  clean: toOptionalString,
});

export const city = input({
  label: "City",
  comments: "The city of the registrant.",
  type: "string",
  required: false,
  example: "Sioux Falls",
  placeholder: "Sioux Falls",
  clean: toOptionalString,
});

export const state = input({
  label: "State",
  comments: "The state of the registrant.",
  type: "string",
  required: false,
  example: "South Dakota",
  placeholder: "South Dakota",
  clean: toOptionalString,
});

export const zipCode = input({
  label: "Zip Code",
  comments: "The zip code of the registrant.",
  type: "string",
  required: false,
  example: "57104",
  placeholder: "57104",
  clean: toOptionalString,
});

export const country = input({
  label: "Country",
  comments: "The country of the registrant.",
  type: "string",
  required: false,
  example: "United States",
  placeholder: "United States",
  clean: toOptionalString,
});

export const phone = input({
  label: "Phone",
  comments: "The phone number of the registrant.",
  type: "string",
  required: false,
  example: "605-555-5555",
  placeholder: "605-555-5555",
  clean: toOptionalString,
});

export const organization = input({
  label: "Organization",
  comments: "The organization of the registrant.",
  type: "string",
  required: false,
  example: "Acme Corp",
  placeholder: "Acme Corp",
  clean: toOptionalString,
});

export const jobTitle = input({
  label: "Job Title",
  comments: "The job title of the registrant.",
  type: "string",
  required: false,
  example: "Software Engineer",
  placeholder: "Software Engineer",
  clean: toOptionalString,
});

export const questionAndComments = input({
  label: "Questions and Comments",
  comments: "Any questions or comments the registrant has.",
  type: "string",
  required: false,
  example: "I have a question about the webinar.",
  placeholder: "I have a question about the webinar.",
  clean: toOptionalString,
});

export const industry = input({
  label: "Industry",
  comments: "The industry of the registrant.",
  type: "string",
  required: false,
  example: "IT",
  placeholder: "IT",
  clean: toOptionalString,
});

export const numberOfEmployees = input({
  label: "Number of Employees",
  comments: "The number of employees in the organization.",
  type: "string",
  required: false,
  example: "100",
  placeholder: "100",
  clean: toOptionalNumber,
});

export const purchasingTimeFrame = input({
  label: "Purchasing Time Frame",
  comments: "The time frame within which the product will be purchased.",
  type: "string",
  required: false,
  example: "1-3 months",
  placeholder: "1-3 months",
  clean: toOptionalString,
});

export const purchasingRole = input({
  label: "Purchasing Role",
  comments: "The role of the registrant in the purchasing process.",
  type: "string",
  required: false,
  example: "Decision Maker",
  placeholder: "Decision Maker",
  clean: toOptionalString,
});

export const responses = input({
  label: "Responses",
  comments: "The responses to the custom questions.",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [{ questionKey: "qkey", responseText: "responseText", answerKey: "akey" }],
    null,
    2,
  ),
  clean: toOptionalObject,
});

export const createRegistrantInputs = {
  connection,
  webinarKey,
  firstName,
  lastName,
  email,
  source,
  address,
  city,
  state,
  zipCode,
  country,
  phone,
  organization,
  jobTitle,
  questionAndComments,
  industry,
  numberOfEmployees,
  purchasingTimeFrame,
  purchasingRole,
  responses,
};
