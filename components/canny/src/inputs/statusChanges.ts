import { boardId, connection, cursor, fetchAll, limit } from "./common";

export const listStatusChangesInputs = {
  connection,
  boardId,
  fetchAll,
  cursor,
  limit,
};
