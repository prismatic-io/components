import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { deleteAttachmentExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteAttachmentInputs as inputs } from "../../inputs/assets";

export const deleteAttachment = action({
  display: {
    label: "Delete Attachment",
    description: "Delete an existing Attachment.",
  },
  perform: async (context, { connection, attachmentId }) => {
    const mutation = gql`
      mutation deleteAttachment($input: DeleteAttachmentInput!) {
        deleteAttachment(input: $input) {
          id
        }
      }
    `;

    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input: { id: attachmentId } });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
