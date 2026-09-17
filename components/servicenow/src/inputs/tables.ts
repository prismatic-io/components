import {
  apiVersionInput,
  connection,
  fetchAll,
  fieldValuesInput,
  instanceUrlInput,
  pagination,
  sysId,
  sysparmFields,
  sysparmQuery,
  tableNameInput,
} from "./common";
export const listTablesInputs = {
  connection,
  instanceUrlInput,
  sysparmFields,
  sysparmQuery,
  fetchAll,
  pagination,
};
export const createTableRecordInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  tableNameInput,
  fieldValuesInput,
};
export const deleteTableRecordInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  tableNameInput,
  sysId,
};
export const getTableRecordInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  tableNameInput,
  sysId,
};
export const listTableRecordsInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  tableNameInput,
  sysparmQuery,
  fetchAll,
  pagination,
};
export const updateTableRecordInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  tableNameInput,
  sysId,
  fieldValuesInput,
};
