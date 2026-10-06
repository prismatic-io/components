import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  getCustomTaskIds,
  getTaskId,
  getTeamId,
} from "./common";
const getFile = (required: boolean) =>
  input({
    label: "File",
    placeholder: "File from previous step",
    comments: "File to attach.",
    type: "data",
    required,
    clean: util.types.toBufferDataPayload,
  });
const getFileName = (required: boolean) =>
  input({
    label: "File Name",
    placeholder: "Enter file name",
    comments: "Name of the file to attach.",
    type: "string",
    required,
    example: "my-image.png",
    clean: util.types.toString,
  });
export const createTaskAttachmentInputs = {
  connection: connectionInput,
  taskId: getTaskId(true, "The unique identifier for the task."),
  file: getFile(true),
  fileName: getFileName(true),
  customTaskIds: getCustomTaskIds(false),
  teamId: getTeamId(
    false,
    "Only used when the custom_task_ids parameter is set to true.",
  ),
};
