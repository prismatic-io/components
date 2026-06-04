import { input, util } from "@prismatic-io/spectral";
import { $select, additionalInputs, connection, defaultListInputs } from "./general";

const recordTypeId = input({
  label: "Record Type ID",
  type: "string",
  required: true,
  comments: "The ID of the record type to retrieve",
  placeholder: "1234-5678",
  example: "1234-5678",
  clean: util.types.toString,
});

const recordType = input({
  label: "Record Type",
  type: "string",
  required: true,
  comments: "The type of record to create",
  placeholder: "Candidate",
  example: "Candidate",
  clean: util.types.toString,
});

export const getRecordInputs = {
  recordType,
  recordTypeId,
  $select,
  connection,
};

export const deleteRecordInputs = {
  recordType: {
    ...recordType,
    comments: "The type of record to delete",
  },
  recordTypeId: {
    ...recordTypeId,
    comments: "The ID of the record to delete",
  },
  connection,
};

export const createRecordInputs = {
  recordType,
  additionalInputs,
  connection,
};

export const updateRecordInputs = {
  recordType,
  recordTypeId,
  additionalInputs,
  connection,
};

export const listRecordsInputs = {
  recordType,
  ...defaultListInputs,
};
