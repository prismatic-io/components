import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { addGroupExamplePayload as examplePayload } from "../examplePayloads";
import { addGroupInputs as inputs } from "../inputs";

export const addGroup = action({
  display: {
    label: "Add Group",
    description: "Adds a group in Active Directory.",
  },
  perform: async (
    context,
    { connection, groupDn, groupName, groupType, sAMAccountName },
  ) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({
        groupDn,
        groupName,
        groupType,
        sAMAccountName,
      });
    }

    const attributes = {
      cn: groupName,
      sAMAccountName: sAMAccountName,
      objectClass: ["group", "top"],
      groupType: groupType,
    };

    try {
      await client.add(groupDn, attributes);

      return {
        data: `Group ${groupName} has been added successfully.`,
      };
    } catch (err) {
      throw new Error(`Failed to add group: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
