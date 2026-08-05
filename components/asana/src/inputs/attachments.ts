import { input, util } from "@prismatic-io/spectral";
import { validateId } from "../util";
import { connectionInput, optFields, pagination, taskId } from "./common";
const attachmentId = input({
  label: "Attachment ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter attachment ID",
  comments: "The unique identifier for the attachment.",
  required: true,
  dataSource: "selectAttachment",
  clean: validateId,
});
const file = input({
  label: "File",
  comments: "File to attach. This should be a reference to a previous step",
  type: "data",
  required: true,
  clean: util.types.toBufferDataPayload,
});
const fileName = input({
  label: "File Name",
  comments: "Name of the file to attach",
  type: "string",
  required: true,
  example: "my-image.png",
  clean: util.types.toString,
});
export const getAttachmentInputs = {
  asanaConnection: connectionInput,
  attachmentId,
  optFields: {
    ...optFields,
    default: "created_at,download_url,host,name,parent,view_url",
  },
};
export const deleteAttachmentInputs = {
  asanaConnection: connectionInput,
  attachmentId,
};
export const listAttachmentsInputs = {
  asanaConnection: connectionInput,
  pagination,
  taskId,
};
export const attachFileToTaskInputs = {
  asanaConnection: connectionInput,
  file,
  fileName,
  taskId,
};
export const selectAttachmentInputs = {
  connection: connectionInput,
  taskId: { ...taskId, dataSource: undefined },
};
