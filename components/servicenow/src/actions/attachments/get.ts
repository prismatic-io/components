import { action } from "@prismatic-io/spectral";
import { getAttachmentResponse } from "../../examplePayloads";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { createNowApiClient } from "../../util";

export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description:
      "Returns the metadata for the attachment file with a specific sys_id value.",
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
    const { data } = await client.get(`/attachment/${sysId}`);
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
    data: getAttachmentResponse,
  },
});
