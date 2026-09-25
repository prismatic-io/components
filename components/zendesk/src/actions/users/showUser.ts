import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { showUserInputs } from "../../inputs";
import { showUserOutputSchema } from "../../outputSchemas";
import { showUserExamplePayload } from "../../examplePayloads";
export const showUser = action({
  display: {
    label: "Get User",
    description: "Get a user by ID.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const { result } = await client.users.show(util.types.toInt(params.userId));
    return {
      data: result,
    };
  },
  inputs: showUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: showUserOutputSchema,
  }),
  examplePayload: showUserExamplePayload,
});
