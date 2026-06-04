import {
  connectionInput,
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
