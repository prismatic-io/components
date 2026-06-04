import { connectionInput, getlistId, getTaskId } from "./common";

const listIdForGetList = getlistId(true);
const taskIdForGetTask = getTaskId(true);

export const getListMembersInputs = {
  clickUpConnection: connectionInput,
  listId: listIdForGetList,
};

export const getTaskMembersInputs = {
  clickUpConnection: connectionInput,
  taskId: taskIdForGetTask,
};
