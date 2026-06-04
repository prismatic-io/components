import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { moveUserToOrganizationalUnitExamplePayload as examplePayload } from "../examplePayloads";
import { moveUserToOrganizationalUnitInputs as inputs } from "../inputs";

export const moveUserToOrganizationalUnit = action({
  display: {
    label: "Move User to Organizational Unit",
    description: "Moves a user to an organizational unit in Active Directory.",
  },
  perform: async (context, { connection, ouUserDn, newOuUserDn }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ ouUserDn, newOuUserDn });
    }

    try {
      await client.modifyDN(ouUserDn, newOuUserDn);

      return {
        data: `Successfully moved user to ${newOuUserDn}.`,
      };
    } catch (err) {
      throw new Error(`Failed to move user to ${newOuUserDn}. ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
