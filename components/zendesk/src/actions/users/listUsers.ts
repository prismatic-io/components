import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { listUsersOutputSchema } from "../../outputSchemas";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const result = await client.users.list();
    return {
      data: result,
    };
  },
  examplePerform: async () => listUsersExamplePayload,
  inputs: listUsersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUsersOutputSchema,
  }),
  examplePayload: listUsersExamplePayload,
});
