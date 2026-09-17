import { action } from "@prismatic-io/spectral";
import { deleteAttachmentExamplePayload } from "../../examplePayloads";
import { deleteAttachmentInputs } from "../../inputs";
import { createNowApiClient } from "../../util";
export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description: "Deletes the attachment with a specific sys_id value.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { apiVersionInput, connection, instanceUrlInput, sysId },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/attachment/${sysId}`);
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteAttachmentExamplePayload.data,
  }),
  inputs: deleteAttachmentInputs,
  examplePayload: deleteAttachmentExamplePayload,
});
