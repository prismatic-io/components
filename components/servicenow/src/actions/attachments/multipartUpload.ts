import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { multipartUploadAttachmentResponse } from "../../examplePayloads";
import {
  apiVersionInput,
  connection,
  file,
  fileName,
  instanceUrlInput,
  sysId,
  tableNameInput,
} from "../../inputs";
import { createNowApiClient } from "../../util";

export const multipartUploadAttachment = action({
  display: {
    label: "Multipart Upload Attachment",
    description: "Uploads a multipart file attachment.",
  },
  perform: async (
    context,
    {
      apiVersionInput,
      connection,
      instanceUrlInput,
      file,
      fileName,
      sysId,
      tableNameInput,
    },
  ) => {
    const { data: fileData, contentType } = file;
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    const formData = new FormData();
    formData.append("table_name", tableNameInput);
    formData.append("table_sys_id", sysId);
    formData.append("file", fileData, {
      filename: fileName,
      contentType,
    });
    const { data } = await client.post(`/attachment/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      data,
    };
  },
  inputs: {
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
  },
  examplePayload: {
    data: multipartUploadAttachmentResponse,
  },
});
