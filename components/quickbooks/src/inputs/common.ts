import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The QuickBooks connection to use.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  required: false,
  placeholder: "Enter maximum results",
  example: "1000",
  comments: "The maximum number of results to return.",
  clean: cleanStringInput,
});

export const startPosition = input({
  label: "Start Position",
  type: "string",
  required: false,
  placeholder: "Enter start position",
  example: "1",
  comments: "The starting position to return results from.",
  clean: cleanStringInput,
});

export const minorVersion = input({
  label: "API Minor Version",
  placeholder: "Enter API minor version",
  type: "string",
  required: false,
  example: "75",
  comments: "The minor version of the QuickBooks API to use.",
  clean: cleanStringInput,
});

export const dynamicValues = input({
  label: "Dynamic Fields",
  type: "data",
  required: false,
  comments:
    "A field for dynamic inputs that can be configured at deploy time with the use of a key/value config variable.",
});

export const fieldValues = input({
  label: "Optional Values",
  placeholder: "Enter optional field values",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "The names of optional fields and their values to use when creating/updating a record. For example, if you have a custom configured field that is not represented as an input, here you are able to specify its key and assign it a value.",
});

export const id = input({
  label: "ID",
  placeholder: "Enter ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the resource. Must be an integer.",
  example: "1234",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  placeholder: "Enter description",
  type: "string",
  required: true,
  example: "This is an example description.",
  comments: "The description of the resource.",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  placeholder: "Enter email address",
  type: "string",
  required: true,
  example: "someone@example.com",
  comments: "A valid email address to send the receipt to.",
  clean: util.types.toString,
});

export const verificationToken = input({
  label: "Verification Token",
  placeholder: "Enter verification token",
  type: "string",
  required: true,
  comments: "The verification token from the QuickBooks dashboard.",
  clean: util.types.toString,
});

export const parentRef = input({
  label: "Parent Class Reference",
  placeholder: "Enter parent class reference",
  type: "string",
  required: false,
  comments: "The reference ID for the parent class of this sub-class entity.",
  clean: cleanStringInput,
});

export const baseRecord = input({
  label: "Base Record",
  type: "data",
  required: false,
  comments:
    "Reference the existing record (from 'Get Resource' or other action) or desired base record. QuickBooks only does full updates and treats unspecified keys as clearing out that field.",
});
