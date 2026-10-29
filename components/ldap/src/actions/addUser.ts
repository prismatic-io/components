import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { addUserExamplePayload as examplePayload } from "../examplePayloads";
import { addUserInputs as inputs } from "../inputs";
import { formatPassword } from "../util";

export const addUser = action({
  display: {
    label: "Add User",
    description: "Adds a user in Active Directory.",
  },
  perform: async (
    context,
    {
      connection,
      userDn,
      userName,
      sAMAccountName,
      userPrincipalName,
      password,
    },
  ) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({
        userDn,
        userName,
        sAMAccountName,
        userPrincipalName,
      });
    }

    try {
      const attributes = {
        cn: userName,
        sAMAccountName,
        userPrincipalName,
        objectClass: ["top", "person", "organizationalPerson", "user"],
        unicodePwd: formatPassword(password).toString(),
        userAccountControl: "512",
      };

      await client.add(userDn, attributes);

      return {
        data: `User ${userName} has been created successfully.`,
      };
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
