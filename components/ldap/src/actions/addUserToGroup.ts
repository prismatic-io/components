import { action } from "@prismatic-io/spectral";
import { Attribute, Change } from "ldapts";
import { getLdapClient } from "../client";
import { addUserToGroupExamplePayload as examplePayload } from "../examplePayloads";
import { addUserToGroupInputs as inputs } from "../inputs";

export const addUserToGroup = action({
  display: {
    label: "Add User to Group",
    description: "Adds a user to a group in Active Directory.",
  },
  perform: async (context, { connection, groupDn, userDnToAdd }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ groupDn, userDnToAdd });
    }

    const change = new Change({
      operation: "add",
      modification: new Attribute({
        type: "member",
        values: [userDnToAdd],
      }),
    });

    try {
      await client.modify(groupDn, change);

      return {
        data: `User ${userDnToAdd} added to group ${groupDn}.`,
      };
    } catch (err) {
      throw new Error(`Failed to add user to group: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
