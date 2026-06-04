import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { createAttachmentExamplePayload as examplePayload } from "../../examplePayloads";
import { createAttachmentInputs as inputs } from "../../inputs/assets";

export const createAttachment = action({
  display: {
    label: "Create Attachment",
    description: "Create a new Attachment.",
  },
  perform: async (context, { connection, ...input }) => {
    const mutation = gql`
      mutation createAttachment($input: CreateAttachmentInput!) {
        createAttachment(input: $input) {
          job {
            attachmentId
          }
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input: { ...input } });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
