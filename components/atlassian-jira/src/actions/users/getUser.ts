import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserInputs } from "../../inputs";
import { getUserOutputSchema } from "../../outputSchemas";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Get the information and metadata of a user by ID.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/user", {
      params: {
        accountId: params.accountId,
        expand: params.expand || undefined,
      },
    });
    return { data };
  },
  inputs: getUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserOutputSchema,
  }),
  examplePayload: getUserExamplePayload,
});
