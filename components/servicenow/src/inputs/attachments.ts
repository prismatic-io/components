import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fetchAll,
  file,
  fileName,
  instanceUrlInput,
  sysId,
  sysparmLimit,
  sysparmOffset,
  sysparmQuery,
  tableNameInput,
} from "./common";
export const getAttachmentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
};
export const getAttachmentFileInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
};
export const deleteAttachmentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId: {
    ...sysId,
    comments: "Sys_id value of the attachment to delete.",
  },
};
const listAttachmentsPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and offset for paginated retrieval.",
  inputs: {
    sysparmLimit: {
      ...sysparmLimit,
      comments:
        "Limit to be applied on pagination. Default is 1000. Unusually large values can impact system performance.",
    },
    sysparmOffset,
  },
});
export const listAttachmentsInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysparmQuery,
  fetchAll,
  pagination: listAttachmentsPagination,
};
export const uploadAttachmentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  file,
  fileName,
  tableNameInput: {
    ...tableNameInput,
    comments: "Name of the table to attach the file to.",
  },
  sysId: {
    ...sysId,
    comments:
      "Sys_id of the record in the table specified in table_name that you want to attach the file to.",
  },
};
export const multipartUploadAttachmentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  file,
  fileName,
  tableNameInput: {
    ...tableNameInput,
    comments: "Name of the table to which you want to attach the file.",
  },
  sysId: {
    ...sysId,
    comments:
      "Sys_id of the record on the specified table to which you want to attach the file.",
  },
};
