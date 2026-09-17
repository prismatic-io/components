import {
  apiVersionInput,
  connection,
  fetchAll,
  fieldValuesInput,
  instanceUrlInput,
  pagination,
  sysId,
  sysparmQuery,
} from "./common";
export const createIncidentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  fieldValuesInput,
};
export const deleteIncidentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
};
export const getIncidentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
};
export const listIncidentsInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysparmQuery,
  fetchAll,
  pagination,
};
export const updateIncidentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
  fieldValuesInput,
};
