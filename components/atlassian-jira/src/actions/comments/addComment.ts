import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { addCommentExamplePayload } from "../../examplePayloads";
import { addCommentInputs } from "../../inputs";
import { addCommentOutputSchema } from "../../outputSchemas";

export const addComment = action({
  display: {
    label: "Add Comment",
    description: "Add a comment to an existing issue.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );

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
  examplePerform: async () => addCommentExamplePayload,
  inputs: addCommentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addCommentOutputSchema,
  }),
  examplePayload: addCommentExamplePayload,
});
