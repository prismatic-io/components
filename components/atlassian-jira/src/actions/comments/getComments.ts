import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { getCommentsExamplePayload } from "../../examplePayloads";
import { getCommentsInputs } from "../../inputs";
import { getCommentsOutputSchema } from "../../outputSchemas";

export const getComments = action({
  display: {
    label: "Get Comments",
    description: "Get all comments on a given issue.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/issue/${params.issueId}/comment`);
    return { data };
  },
  examplePerform: async () => getCommentsExamplePayload,
  inputs: getCommentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCommentsOutputSchema,
  }),
  examplePayload: getCommentsExamplePayload,
});
