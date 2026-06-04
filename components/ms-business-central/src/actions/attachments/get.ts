import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getAttachmentExamplePayload } from "../../examplePayloads";
import { companyId } from "../../inputs/accounts/getAccountsInputs";
import { parentId, parentType } from "../../inputs/attachments/createAttachmentInputs";
import { connectionInput } from "../../inputs/general";
import type { Attachment, MultipleItemsResponse } from "../../interfaces";

export const getAttachment = action({
  display: {
    label: "Get Attachment",
    description: "Gets an attachment object",
  },
  perform: async (context, { parentType, connection, companyId, parentId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    const params = {
      $filter: `parentId eq ${parentId} and parentType eq '${parentType}'`,
    };

    const { data } = await client.get<MultipleItemsResponse<Attachment[]>>(
      `/companies(${companyId})/attachments`,
      {
        params,
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    companyId,
    parentId,
    parentType,
  },
  examplePayload: getAttachmentExamplePayload,
});
