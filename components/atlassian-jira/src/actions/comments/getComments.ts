import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { getCommentsExamplePayload } from "../../examplePayloads";
import { connectionInput, issueId } from "../../inputs";

export const getComments = action({
  display: {
    label: "Get Comments",
    description: "Get all comments on a given issue.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get(`/issue/${params.issueId}/comment`);
    return { data };
  },
  inputs: { jiraConnection: connectionInput, issueId },
  examplePayload: getCommentsExamplePayload,
});
