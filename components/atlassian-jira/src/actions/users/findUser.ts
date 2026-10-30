import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { findUserExamplePayload } from "../../examplePayloads";
import { findUserInputs } from "../../inputs";
import { findUserOutputSchema } from "../../outputSchemas";

export const findUser = action({
  display: {
    label: "Find User",
    description: "Find a user by attribute.",
  },
  inputs: findUserInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/user/search", {
      params: {
        query: params.searchValue,
      },
    });
    return { data };
  },
  examplePerform: async () => findUserExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: findUserOutputSchema,
  }),
  examplePayload: findUserExamplePayload,
});
