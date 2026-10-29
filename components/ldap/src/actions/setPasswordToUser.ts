import { action } from "@prismatic-io/spectral";
import { Attribute, Change } from "ldapts";
import { getLdapClient } from "../client";
import { setPasswordToUserExamplePayload as examplePayload } from "../examplePayloads";
import { setPasswordToUserInputs as inputs } from "../inputs";
import { formatPassword } from "../util";

export const setPasswordToUser = action({
  display: {
    label: "Set Password to User",
    description: "Sets a user password in Active Directory.",
  },
  perform: async (context, { connection, userDn, newPassword }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ userDn });
    }

    try {
      const change = new Change({
        operation: "replace",
        modification: new Attribute({
          type: "unicodePwd",
          values: [formatPassword(newPassword)],
        }),
      });

      await client.modify(userDn, change);

      return {
        data: `Password set successfully for user ${userDn}.`,
      };
    } catch (err) {
      throw new Error(`Failed to set password for user ${userDn}. ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
