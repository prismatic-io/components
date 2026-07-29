import {
  connectionInput,
  fieldCodeInput,
  paginationLimitInput,
  paginationStartInput,
  personFieldIdInput,
} from "./common";
export const getPersonFieldsInputs = {
  connection: connectionInput,
  start: paginationStartInput,
  limit: paginationLimitInput,
};
export const getPersonFieldInputs = {
  connection: connectionInput,
  id: personFieldIdInput,
};
export const deletePersonFieldInputs = {
  connection: connectionInput,
  id: personFieldIdInput,
};
export const getPersonFieldV2Inputs = {
  connection: connectionInput,
  fieldCode: {
    ...fieldCodeInput,
    comments: "The field code of the person field.",
  },
};
export const deletePersonFieldV2Inputs = {
  connection: connectionInput,
  fieldCode: {
    ...fieldCodeInput,
    comments: "The field code of the person field.",
  },
};
