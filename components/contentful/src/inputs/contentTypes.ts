import { input, util } from "@prismatic-io/spectral";
import { FIELDS_DEFAULT } from "../constants";
import { cleanCodeInput, stringOrUndefinedCleaner } from "../util";
import { connection, contentTypeId, environmentId, spaceId } from "./common";



const contentTypeName = input({
  label: "Content Type Name",
  type: "string",
  comments: "The display name for the content type.",
  example: "Blog Post",
  placeholder: "Enter content type name",
  required: true,
  clean: util.types.toString,
});

const contentTypeFields = input({
  label: "Content Type Fields",
  type: "code",
  language: "json",
  comments:
    "The field definitions for the content type as a JSON array of field objects.",
  placeholder: "Enter content type fields JSON",
  default: JSON.stringify(FIELDS_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const displayField = input({
  label: "Display Field",
  type: "string",
  comments:
    "The field used as the main display field for entries of this content type.",
  example: "title",
  placeholder: "Enter display field name",
  required: false,
  clean: stringOrUndefinedCleaner,
});

const contentTypeDescription = input({
  label: "Description",
  type: "string",
  comments:
    "A brief explanation of what this content type is used for in the content model.",
  example: "A blog post",
  placeholder: "Enter content type description",
  required: false,
  clean: stringOrUndefinedCleaner,
});



export const createContentTypeInputs = {
  connection,
  spaceId,
  environmentId,
  name: contentTypeName,
  fields: contentTypeFields,
  displayField,
  description: contentTypeDescription,
};



export const listContentTypesInputs = {
  connection,
  spaceId,
  environmentId,
};



export const updateContentTypeInputs = {
  connection,
  spaceId,
  environmentId,
  contentTypeId,
  name: {
    ...contentTypeName,
    required: false,
    comments: "The updated name for the content type.",
    clean: stringOrUndefinedCleaner,
  },
  fields: {
    ...contentTypeFields,
    required: false,
    comments: "The updated field definitions for the content type.",
  },
  displayField: {
    ...displayField,
    comments: "The updated field used as the main display field for entries.",
  },
  description: {
    ...contentTypeDescription,
    comments: "The updated description for the content type.",
  },
};
