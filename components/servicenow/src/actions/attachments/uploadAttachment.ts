import { action } from "@prismatic-io/spectral";
import { uploadAttachmentExamplePayload } from "../../examplePayloads";
import { uploadAttachmentInputs } from "../../inputs";
import { createNowApiClient } from "../../util";
export const uploadAttachment = action({
  display: {
    label: "Upload Attachment",
    description:
      "Uploads a specified binary file as an attachment to a specified record.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: uploadAttachmentExamplePayload.data,
  }),
  inputs: uploadAttachmentInputs,
  examplePayload: uploadAttachmentExamplePayload,
});
