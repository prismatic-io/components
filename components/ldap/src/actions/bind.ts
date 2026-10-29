import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { bindExamplePayload as examplePayload } from "../examplePayloads";
import { bindInputs as inputs } from "../inputs";

export const bind = action({
  display: {
    label: "Bind",
    description: "Tests binding to Active Directory.",
  },
  perform: async (context, { connection }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug("Binding to LDAP server");
    }

    await client.unbind();

    return { data: "Successfully bound to LDAP server." };
  },
  inputs,
  examplePayload,
});
