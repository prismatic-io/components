import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createAttachmentExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { fileName, parentId, parentType } from "../../inputs/attachments/createAttachmentInputs";
import { connectionInput } from "../../inputs/general";
import type { Attachment } from "../../interfaces";

export const createAttachment = action({
  display: {
    label: "Create Attachment",
    description: "Create a new attachment",
  },
  perform: async (context, { fileName, parentId, parentType, connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const payload = {
      fileName,
      parentId,
      parentType,
    };

    const { data } = await client.post<Attachment>(`/companies(${companyId})/attachments`, payload);

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    parentId,
    fileName,
    parentType,
  },
  examplePayload: createAttachmentExamplePayload,
});
