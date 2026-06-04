import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { addCommentExamplePayload } from "../../examplePayloads";
import { comment, connectionInput, dynamicValues, fieldValues, issueId } from "../../inputs";

export const addComment = action({
  display: {
    label: "Add Comment",
    description: "Add a comment to an existing issue.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);

    const { data } = await client.post(`/issue/${params.issueId}/comment`, {
      body: {
        content: [
          {
            content: [
              {
                text: params.comment,
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
    comment,
    dynamicValues,
    fieldValues,
  },
  examplePayload: addCommentExamplePayload,
});
