import { connectionInput, getlistId, getTaskId } from "./common";
export const getListMembersInputs = {
  clickUpConnection: connectionInput,
  listId: getlistId(true, "The unique identifier for the List."),
};
export const getTaskMembersInputs = {
  clickUpConnection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
};
