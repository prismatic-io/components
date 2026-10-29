import { action } from "@prismatic-io/spectral";
import { Attribute, Change } from "ldapts";
import { getLdapClient } from "../client";
import { removeUserFromGroupExamplePayload as examplePayload } from "../examplePayloads";
import { removeUserFromGroupInputs as inputs } from "../inputs";

export const removeUserFromGroup = action({
  display: {
    label: "Remove User From Group",
    description: "Removes a user from a group in Active Directory.",
  },
  perform: async (context, { connection, groupDn, userDnToRemove }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ groupDn, userDnToRemove });
    }

    const change = new Change({
      operation: "delete",
      modification: new Attribute({
        type: "member",
        values: [userDnToRemove],
      }),
    });
    try {
      await client.modify(groupDn, change);

      return {
        data: `User ${userDnToRemove} removed from group ${groupDn}.`,
      };
    } catch (err) {
      throw new Error(`Failed to remove user from group: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
