import { connection, fetchAll, limit, serviceDeskId, start } from "./common";

export const listServiceDesksInputs = {
  connection,
  fetchAll,
  start,
  limit,
};

export const getServiceDeskInputs = {
  connection,
  serviceDeskId,
};
