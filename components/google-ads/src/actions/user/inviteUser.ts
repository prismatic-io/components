import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { inviteUserExamplePayload } from "../../examplePayloads";
import { inviteUserInputs } from "../../inputs";

export const inviteUser = action({
  display: {
    label: "Invite User",
    description: "Invite a user by email to a customer.",
  },
  inputs: inviteUserInputs,
  perform: async (
    context,
    { connection, customerId, accessRole, emailAddress },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
    );

    
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
  examplePayload: inviteUserExamplePayload,
});
