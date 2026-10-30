import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { createUserExamplePayload } from "../../examplePayloads";
import { createUserInputs } from "../../inputs";
import { createUserOutputSchema } from "../../outputSchemas";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user record.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.post("/user", {
      name: util.types.toString(params.username),
      password: util.types.toString(params.password),
      emailAddress: util.types.toString(params.emailAddress),
      displayName: util.types.toString(params.displayName),
      notification: util.types.toBool(params.notifications),
      ...params.fieldValues,
      ...params.dynamicValues,
    });
    return { data };
  },
  examplePerform: async () => createUserExamplePayload,
  inputs: createUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createUserOutputSchema,
  }),
  examplePayload: createUserExamplePayload,
});
