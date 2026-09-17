import { action } from "@prismatic-io/spectral";
import { getAttachmentExamplePayload } from "../../examplePayloads";
import { getAttachmentInputs } from "../../inputs";
import { createNowApiClient } from "../../util";
export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description:
      "Returns the metadata for the attachment file with a specific sys_id value.",
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
    const { data } = await client.get(`/attachment/${sysId}`);
    return {
      data,
    };
  },
  inputs: getAttachmentInputs,
  examplePayload: getAttachmentExamplePayload,
});
