import {
  connection,
  fetchAll,
  limit,
  requestTypeId,
  serviceDeskId,
  start,
} from "./common";

export const listRequestTypesInputs = {
  connection,
  serviceDeskId,
  fetchAll,
  start,
  limit,
};

export const getRequestTypeInputs = {
  connection,
  serviceDeskId,
  requestTypeId,
};
