import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const fieldId = input({
  label: "Field ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier of the person field to retrieve details for.",
  example: "123",
  placeholder: "Enter Field ID",
});

const personIdString = input({
  label: "Person ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier of the person whose field value is being updated.",
  example: "123",
  placeholder: "Enter Person ID",
});

const customFieldKey = input({
  label: "Field Key",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The internal key of the custom field to update.",
  example: "abc123def456",
  placeholder: "Enter field key",
});

const value = input({
  label: "Value",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The value to assign to the custom field.",
  example: "New value",
  placeholder: "Enter field value",
});

export const getPersonFieldDetailsInputs = {
  connection: connectionInput,
  fieldId,
};

export const setFieldValueForPersonInputs = {
  connection: connectionInput,
  personId: personIdString,
  customFieldKey,
  value,
};
