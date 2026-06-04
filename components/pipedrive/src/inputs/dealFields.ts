import {
  connectionInput,
  dealFieldIdInput,
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
