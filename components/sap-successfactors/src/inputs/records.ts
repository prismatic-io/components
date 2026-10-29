import { input, util } from "@prismatic-io/spectral";
import {
  $count,
  $expand,
  $filter,
  $orderby,
  $search,
  $select,
  $skip,
  $top,
  additionalInputs,
  connection,
  customQueryParams,
  fetchAll,
} from "./common";

const recordTypeId = input({
  label: "Record Type ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the record within its record type.",
  placeholder: "Enter a record ID",
  example: "1234-5678",
  clean: util.types.toString,
});

const recordType = input({
  label: "Record Type",
  type: "string",
  required: true,
  comments:
    "The OData entity name identifying the kind of record to operate on.",
  placeholder: "Enter a record type",
  example: "Candidate",
  clean: util.types.toString,
});

export const getRecordInputs = {
  connection,
  recordType,
  recordTypeId,
  $select,
};

export const deleteRecordInputs = {
  connection,
  recordType: {
    ...recordType,
    comments: "The OData entity name identifying the kind of record to delete.",
  },
  recordTypeId: {
    ...recordTypeId,
    comments: "The unique identifier for the record to delete.",
  },
};

export const createRecordInputs = {
  connection,
  recordType,
  additionalInputs,
};

export const updateRecordInputs = {
  connection,
  recordType,
  recordTypeId,
  additionalInputs,
};

export const listRecordsInputs = {
  connection,
  recordType,
  fetchAll,
  $top,
  $skip,
  $search,
  $select,
  $filter,
  $count,
  $orderby,
  $expand,
  customQueryParams,
};
