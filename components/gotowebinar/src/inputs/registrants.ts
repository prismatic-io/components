import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalObject, toOptionalString } from "../util";
import {
  connection,
  pageNumber,
  pageSize,
  registrantKey,
  webinarKey,
} from "./common";
export const firstName = input({
  label: "First Name",
  comments: "The first name of the registrant.",
  type: "string",
  required: true,
  example: "John",
  placeholder: "Enter a first name",
  clean: util.types.toString,
});
export const lastName = input({
  label: "Last Name",
  comments: "The last name of the registrant.",
  type: "string",
  required: true,
  example: "Doe",
  placeholder: "Enter a last name",
  clean: util.types.toString,
});
export const email = input({
  label: "Email",
  comments: "The email address of the registrant.",
  type: "string",
  required: true,
  example: "johndoe@testemail.com",
  placeholder: "Enter an email address",
  clean: util.types.toString,
});
export const source = input({
  label: "Source",
  comments:
    "The source that led to the registration. " +
    "This can be any string like 'Newsletter 123' or 'Marketing campaign ABC'.",
  type: "string",
  required: false,
  example: "website",
  placeholder: "Enter a registration source",
  clean: toOptionalString,
});
export const address = input({
  label: "Address",
  comments: "The street address of the registrant.",
  type: "string",
  required: false,
  example: "123 Main St",
  placeholder: "Enter a street address",
  clean: toOptionalString,
});
export const city = input({
  label: "City",
  comments: "The city of the registrant.",
  type: "string",
  required: false,
  example: "Sioux Falls",
  placeholder: "Enter a city",
  clean: toOptionalString,
});
export const state = input({
  label: "State",
  comments: "The state or province of the registrant.",
  type: "string",
  required: false,
  example: "South Dakota",
  placeholder: "Enter a state",
  clean: toOptionalString,
});
export const zipCode = input({
  label: "Zip Code",
  comments: "The postal code of the registrant.",
  type: "string",
  required: false,
  example: "57104",
  placeholder: "Enter a zip code",
  clean: toOptionalString,
});
export const country = input({
  label: "Country",
  comments: "The country of the registrant.",
  type: "string",
  required: false,
  example: "United States",
  placeholder: "Enter a country",
  clean: toOptionalString,
});
export const phone = input({
  label: "Phone",
  comments: "The phone number of the registrant.",
  type: "string",
  required: false,
  example: "605-555-5555",
  placeholder: "Enter a phone number",
  clean: toOptionalString,
});
export const organization = input({
  label: "Organization",
  comments: "The organization the registrant belongs to.",
  type: "string",
  required: false,
  example: "Acme Corp",
  placeholder: "Enter an organization",
  clean: toOptionalString,
});
export const jobTitle = input({
  label: "Job Title",
  comments: "The job title of the registrant.",
  type: "string",
  required: false,
  example: "Software Engineer",
  placeholder: "Enter a job title",
  clean: toOptionalString,
});
export const questionAndComments = input({
  label: "Questions and Comments",
  comments: "Any questions or comments submitted by the registrant.",
  type: "string",
  required: false,
  example: "I have a question about the webinar.",
  placeholder: "Enter any questions or comments",
  clean: toOptionalString,
});
export const industry = input({
  label: "Industry",
  comments: "The industry the registrant works in.",
  type: "string",
  required: false,
  example: "IT",
  placeholder: "Enter an industry",
  clean: toOptionalString,
});
export const numberOfEmployees = input({
  label: "Number of Employees",
  comments: "The number of employees in the registrant's organization.",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter a number of employees",
  clean: toOptionalNumber,
});
export const purchasingTimeFrame = input({
  label: "Purchasing Time Frame",
  comments: "The time frame within which the product will be purchased.",
  type: "string",
  required: false,
  example: "1-3 months",
  placeholder: "Enter a purchasing time frame",
  clean: toOptionalString,
});
export const purchasingRole = input({
  label: "Purchasing Role",
  comments: "The role of the registrant in the purchasing process.",
  type: "string",
  required: false,
  example: "Decision Maker",
  placeholder: "Enter a purchasing role",
  clean: toOptionalString,
});
export const responses = input({
  label: "Responses",
  comments:
    "The answers to the webinar's custom registration questions. Provide a JSON array of question/response objects.",
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
export const mailingAddress = structuredObjectInput({
  label: "Address",
  required: false,
  comments: "Street address, city, state, zip code, and country.",
  inputs: { address, city, state, zipCode, country },
});
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Organization, Job Title, Industry, Number of Employees, Purchasing Time Frame, Purchasing Role, Questions and Comments, and Responses.",
  inputs: {
    organization,
    jobTitle,
    industry,
    numberOfEmployees,
    purchasingTimeFrame,
    purchasingRole,
    questionAndComments,
    responses,
  },
});
export const createRegistrantInputs = {
  connection,
  firstName,
  lastName,
  webinarKey,
  email,
  phone,
  source,
  mailingAddress,
  additionalFields,
};
export const getRegistrantInputs = {
  connection,
  webinarKey,
  registrantKey,
};
export const deleteRegistrantInputs = getRegistrantInputs;
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page number and page size for paginated results.",
  inputs: { page: pageNumber, limit: pageSize },
});
export const listRegistrantsInputs = {
  connection,
  webinarKey,
  pagination,
};
