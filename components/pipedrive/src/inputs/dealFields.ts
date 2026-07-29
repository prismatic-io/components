import {
  connectionInput,
  dealFieldIdInput,
  fieldCodeInput,
  paginationLimitInput,
  paginationStartInput,
} from "./common";
export const getDealFieldsInputs = {
  connection: connectionInput,
  start: paginationStartInput,
  limit: paginationLimitInput,
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
