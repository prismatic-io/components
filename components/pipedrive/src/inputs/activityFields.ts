import { connectionInput, cursorPagination, fetchAll } from "./common";

export const getActivityFieldsInputs = {
  connection: connectionInput,
};

export const getActivityFieldsV2Inputs = {
  connection: connectionInput,
  fetchAll,
  pagination: cursorPagination,
};
