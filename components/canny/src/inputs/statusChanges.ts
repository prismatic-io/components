import { boardId, connection, cursorPagination, fetchAll } from "./common";
export const listStatusChangesInputs = {
  connection,
  boardId,
  fetchAll,
  pagination: cursorPagination,
};
