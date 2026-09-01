import {
  connection,
  fetchAll,
  pagination,
  requestTypeId,
  serviceDeskId,
} from "./common";
export const listRequestTypesInputs = {
  connection,
  serviceDeskId,
  fetchAll,
  pagination,
};
export const getRequestTypeInputs = {
  connection,
  serviceDeskId,
  requestTypeId,
};
