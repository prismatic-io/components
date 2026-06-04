import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { updateCommentExamplePayload } from "../../examplePayloads";
import {
  comment,
  commentId,
  connectionInput,
  dynamicValues,
  fieldValues,
  issueId,
} from "../../inputs";

export const updateComment = action({
  display: {
    label: "Update Comment",
    description: "Update the contents and metadata of an existing comment.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.put(`/issue/${params.issueId}/comment/${params.commentId}`, {
      body: {
        content: [
          {
            content: [
              {
                text: params.comment || undefined,
                type: "text",
              },
            ],
            type: "paragraph",
          },
        ],
        type: "doc",
        version: 1,
        ...params.dynamicValues,
        ...params.fieldValues,
      },
    });
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
    commentId,
    comment,
    dynamicValues,
    fieldValues,
  },
  examplePayload: updateCommentExamplePayload,
});
