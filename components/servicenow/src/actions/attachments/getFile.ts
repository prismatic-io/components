import { action } from "@prismatic-io/spectral";
import { getAttachmentFileResponse } from "../../examplePayloads";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { createNowApiClient } from "../../util";

export const getAttachmentFile = action({
  display: {
    label: "Get Attachment File",
    description:
      "Returns the binary file attachment with a specific sys_id value.",
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
    const { data } = await client.get(`/attachment/${sysId}/file`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysId,
  },
  examplePayload: {
    data: getAttachmentFileResponse,
  },
});
