import { connectionInput, getCustomTaskIds, getFile, getFileName, getTaskId, getTeamId } from "./common";

const taskId = getTaskId(true);
const customTaskIds = getCustomTaskIds(false);
const teamId = getTeamId(false, "The Workspace (Team) ID. Only used when Custom Task ID is set to true.");
const file = getFile(true);
const fileName = getFileName(true);

export const createTaskAttachmentInputs = {
  connection: connectionInput,
  taskId,
  customTaskIds,
  teamId,
  file,
  fileName,
};
