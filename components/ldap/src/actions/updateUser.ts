import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { updateUserExamplePayload as examplePayload } from "../examplePayloads";
import { updateUserInputs as inputs } from "../inputs";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates a user in Active Directory.",
  },
  perform: async (context, { connection, userToUpdate, changes }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ userToUpdate, changes });
    }

    if (!changes) {
      throw new Error("Changes are required to update a user.");
    }

    try {
      await client.modify(userToUpdate, changes);

      return {
        data: `Successfully updated user at ${userToUpdate}.`,
      };
    } catch (err) {
      throw new Error(`Failed to update user: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
