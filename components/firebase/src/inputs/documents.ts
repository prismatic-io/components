import { input, util } from "@prismatic-io/spectral";
import { keyValuePairsToObject, validateJSON } from "../util";
import {
  collection,
  connectionInput,
  orderBy,
  queryOperatorCode,
} from "./common";

const document = input({
  label: "Document",
  placeholder: "Enter document ID",
  type: "string",
  required: true,
  comments: "Provide a string value for the unique identifier of the document.",
  dataSource: "selectDocument",
  example: "4hJk2mX9pQrT7vWn3LsY",
  clean: util.types.toString,
});

const data = input({
  label: "Data",
  placeholder: "Data",
  type: "data",
  required: true,
  collection: "keyvaluelist",
  comments:
    "The fields to write to the document, as key-value pairs. Each key is a field name and each value is the value to store in that field.",
  clean: keyValuePairsToObject,
});

const fieldToRemove = input({
  label: "Field To Remove",
  placeholder: "Enter field name",
  example: "firstName",
  type: "string",
  required: true,
  comments:
    "The name of the field to delete from the document. Use dot notation, such as address.city, to remove a nested field.",
  clean: util.types.toString,
});

const documents = input({
  type: "code",
  label: "Documents",
  language: "json",
  comments: "An array of documents to be created in the collection.",
  placeholder: "Enter a JSON array of documents",
  required: true,
  default: JSON.stringify(
    [
      {
        field1: "value1",
        field2: "value2",
      },
      {
        field1: "value3",
        field2: "value4",
      },
    ],
    null,
    2,
  ),
  clean: validateJSON,
});

export const createDocumentInputs = {
  collection,
  data,
  firebaseConnection: connectionInput,
};

export const bulkCreateDocumentsInputs = {
  firebaseConnection: connectionInput,
  collection,
  documents,
};

export const listDocumentsInputs = {
  collection,
  firebaseConnection: connectionInput,
  orderBy,
  queryOperatorCode,
};

export const getDocumentInputs = {
  collection,
  document,
  firebaseConnection: connectionInput,
};

export const updateDocumentInputs = {
  collection,
  document,
  data,
  firebaseConnection: connectionInput,
};

export const deleteDocumentInputs = {
  collection,
  document,
  firebaseConnection: connectionInput,
};

export const removeFieldInputs = {
  collection,
  document,
  fieldToRemove,
  firebaseConnection: connectionInput,
};
