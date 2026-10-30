import { boardId, connectionInput, filter, pagination } from "./common";

export const getBoardInputs = {
  jiraConnection: connectionInput,
  boardId,
};

export const listBoardsInputs = {
  jiraConnection: connectionInput,
  filter,
  pagination,
};

export const listBoardsSprintsInputs = {
  jiraConnection: connectionInput,
  boardId,
  pagination,
};
