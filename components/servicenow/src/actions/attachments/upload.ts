import { action } from "@prismatic-io/spectral";
import { uploadAttachmentResponse } from "../../examplePayloads";
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

export const uploadAttachment = action({
  display: {
    label: "Upload Attachment",
    description:
      "Uploads a specified binary file as an attachment to a specified record.",
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
    const { data } = await client.post(`/attachment/file`, fileData, {
      headers: {
        "Content-Type": contentType,
      },
      params: {
        file_name: fileName,
        table_name: tableNameInput,
        table_sys_id: sysId,
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
      comments: "Name of the table to attach the file to.",
    },
    sysId: {
      ...sysId,
      comments:
        "Sys_id of the record in the table specified in table_name that you want to attach the file to.",
    },
  },
  examplePayload: {
    data: uploadAttachmentResponse,
  },
});
