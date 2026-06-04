import {
  connectionInput,
  dynamicValues,
  externalIdFieldName,
  fetchAll,
  fieldValues,
  fieldValueTypes,
  maxRecordsToFetch,
  pageNumber,
  pageSize,
  queryString,
  recordId,
  recordType,
  sortInput,
  version,
} from "./common";
import { records } from "./bulkJobs";

export const createRecordInputs = {
  version,
  recordType,
  dynamicValues,
  fieldValues,
  connection: connectionInput,
};

export const updateRecordInputs = {
  version,
  recordType,
  recordId,
  dynamicValues,
  fieldValues,
  connection: connectionInput,
};

export const deleteRecordInputs = {
  version,
  recordType,
  recordId,
  connection: connectionInput,
};

export const getRecordInputs = {
  version,
  recordType,
  recordId,
  connection: connectionInput,
};

export const findRecordInputs = {
  version,
  recordType,
  dynamicValues,
  fieldValues,
  fieldValueTypes,
  connection: connectionInput,
};

export const findRecordsInputs = {
  version,
  recordType,
  dynamicValues,
  fieldValues,
  fieldValueTypes,
  pageSize,
  pageNumber,
  sort: sortInput,
  fetchAll,
  maxRecordsToFetch,
  connection: connectionInput,
};

export const upsertRecordInputs = {
  version,
  recordType,
  externalIdFieldName,
  records,
  connection: connectionInput,
};

export const queryInputs = {
  version,
  queryString,
  connection: connectionInput,
};
