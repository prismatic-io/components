import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { multipartUploadAttachmentExamplePayload } from "../../examplePayloads";
import { multipartUploadAttachmentInputs } from "../../inputs";
import { createNowApiClient } from "../../util";
export const multipartUploadAttachment = action({
  display: {
    label: "Multipart Upload Attachment",
    description: "Uploads a multipart file attachment.",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: multipartUploadAttachmentExamplePayload.data,
  }),
  inputs: multipartUploadAttachmentInputs,
  examplePayload: multipartUploadAttachmentExamplePayload,
});
