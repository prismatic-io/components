import { connection, pageNumber, pageSize, webinarKey } from "../general";

export const listRegistrantsInputs = {
  connection,
  webinarKey,
  page: pageNumber,
  limit: pageSize,
};
