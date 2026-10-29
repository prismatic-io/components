import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { pullsCreateExamplePayload } from "../../examplePayloads";
import { pullsCreateInputs } from "../../inputs";
import { pullsCreateOutputSchema } from "../../outputSchemas";

export const pullsCreate = action({
  display: {
    label: "Create Pull Request",
    description: "Create a pull request.",
  },
  examplePayload: pullsCreateExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: pullsCreateOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      owner,
      repo,
      title,
      head,
      base,
      body,
      maintainerCanModify,
      draft,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/repos/${owner}/${repo}/pulls`, {
      title,
      head,
      base,
      body,
      maintainer_can_modify: maintainerCanModify,
      draft,
    });
    return { data };
  },
  examplePerform: async (_context, { title, head, base, body, draft }) => ({
    data: {
      ...pullsCreateExamplePayload.data,
      title: title ?? pullsCreateExamplePayload.data.title,
      body: body ?? pullsCreateExamplePayload.data.body,
      draft: draft ?? pullsCreateExamplePayload.data.draft,
      head: {
        ...pullsCreateExamplePayload.data.head,
        ref: head,
      },
      base: {
        ...pullsCreateExamplePayload.data.base,
        ref: base,
      },
    },
  }),
  inputs: pullsCreateInputs,
});
