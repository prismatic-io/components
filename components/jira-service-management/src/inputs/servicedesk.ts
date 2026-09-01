import { connection, fetchAll, pagination, serviceDeskId } from "./common";
export const listServiceDesksInputs = {
  connection,
  fetchAll,
  pagination,
};
export const getServiceDeskInputs = {
  connection,
  serviceDeskId,
};
