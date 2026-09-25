import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { SUCCESS_MESSAGE } from "../../constants";
import { deleteUserExamplePayload } from "../../examplePayloads";
import { deleteUserInputs } from "../../inputs";
import { deleteUserOutputSchema } from "../../outputSchemas";
export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Delete a user by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    await client.users.delete(util.types.toInt(params.userId));
    return {
      data: SUCCESS_MESSAGE,
    };
  },
  examplePerform: async () => deleteUserExamplePayload,
  inputs: deleteUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteUserOutputSchema,
  }),
  examplePayload: deleteUserExamplePayload,
});
