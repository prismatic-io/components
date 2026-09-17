import { action } from "@prismatic-io/spectral";
import { getAttachmentFileExamplePayload } from "../../examplePayloads";
import { getAttachmentFileInputs } from "../../inputs";
import { createNowApiClient } from "../../util";
export const getAttachmentFile = action({
  display: {
    label: "Get Attachment File",
    description:
      "Returns the binary file attachment with a specific sys_id value.",
  },
  performSafety: "safe",
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
    const { data } = await client.get(`/attachment/${sysId}/file`);
    return {
      data,
    };
  },
  inputs: getAttachmentFileInputs,
  examplePayload: getAttachmentFileExamplePayload,
});
