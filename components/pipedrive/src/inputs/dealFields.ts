import {
  connectionInput,
  cursorPagination,
  dealFieldIdInput,
  fetchAll,
  fieldCodeInput,
  offsetPagination,
} from "./common";
export const getDealFieldsInputs = {
  connection: connectionInput,
  pagination: offsetPagination,
};
export const getDealFieldsV2Inputs = {
  connection: connectionInput,
  fetchAll,
  pagination: cursorPagination,
};
export const getDealFieldInputs = {
  connection: connectionInput,
  id: dealFieldIdInput,
};
export const deleteDealFieldInputs = {
  connection: connectionInput,
  id: dealFieldIdInput,
};
export const getDealFieldV2Inputs = {
  connection: connectionInput,
  fieldCode: {
    ...fieldCodeInput,
    comments: "The field code of the deal field.",
  },
};
export const deleteDealFieldV2Inputs = {
  connection: connectionInput,
  fieldCode: {
    ...fieldCodeInput,
    comments: "The field code of the deal field.",
  },
};
