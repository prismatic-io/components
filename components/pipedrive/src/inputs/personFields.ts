import {
  connectionInput,
  cursorPagination,
  fetchAll,
  fieldCodeInput,
  offsetPagination,
  personFieldIdInput,
} from "./common";

export const getPersonFieldsInputs = {
  connection: connectionInput,
  pagination: offsetPagination,
};

export const getPersonFieldsV2Inputs = {
  connection: connectionInput,
  fetchAll,
  pagination: cursorPagination,
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
