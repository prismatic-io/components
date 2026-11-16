import { connectionInput } from "./common";
import {
  keyInput,
  labelInput,
  parametersInput,
  selectPagination,
  suiteQLInput,
} from "./query";
import {
  pagination,
  queryInput,
  recordFieldInput,
  recordTypeInput,
} from "./records";

export const selectRecordTypeInputs = {
  connection: connectionInput,
};

export const selectRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  recordField: recordFieldInput,
  query: queryInput,
  pagination,
};

export const selectSuiteQlInputs = {
  connection: connectionInput,
  query: suiteQLInput,
  parameters: parametersInput,
  key: keyInput,
  label: labelInput,
  pagination: selectPagination,
};
