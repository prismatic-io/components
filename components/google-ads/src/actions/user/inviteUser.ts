import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { inviteUserExamplePayload } from "../../examplePayloads";
import { inviteUserInputs } from "../../inputs";
import { inviteUserOutputSchema } from "../../outputSchemas";
export const inviteUser = action({
  display: {
    label: "Invite User",
    description: "Invites a user by email to a customer.",
  },
  inputs: inviteUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: inviteUserOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customerId, accessRole, emailAddress },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const { data } = await client.post(
      `customers/${customerId}/customerUserAccessInvitations:mutate`,
      {
        operation: {
          create: {
            accessRole,
            emailAddress,
          },
        },
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => inviteUserExamplePayload,
  examplePayload: inviteUserExamplePayload,
});
