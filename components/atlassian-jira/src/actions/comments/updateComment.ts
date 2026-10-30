import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { updateCommentExamplePayload } from "../../examplePayloads";
import { updateCommentInputs } from "../../inputs";
import { updateCommentOutputSchema } from "../../outputSchemas";

export const updateComment = action({
  display: {
    label: "Update Comment",
    description: "Update the contents and metadata of an existing comment.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/issue/${params.issueId}/comment/${params.commentId}`,
      {
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
      },
    );
    return { data };
  },
  examplePerform: async () => updateCommentExamplePayload,
  inputs: updateCommentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCommentOutputSchema,
  }),
  examplePayload: updateCommentExamplePayload,
});
