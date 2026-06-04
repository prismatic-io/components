import { action } from "@prismatic-io/spectral";
import { deleteAttachmentResponse } from "../../examplePayloads";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { createNowApiClient } from "../../util";

export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description:
      "This method deletes the attachment with a specific sys_id value.",
  },
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
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysId: {
      ...sysId,
      comments: "Sys_id value of the attachment to delete.",
    },
  },
  examplePayload: {
    data: deleteAttachmentResponse,
  },
});
