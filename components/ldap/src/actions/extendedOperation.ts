import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { extendedOperationExamplePayload as examplePayload } from "../examplePayloads";
import { extendedOperationInputs as inputs } from "../inputs";

export const extendedOperation = action({
  display: {
    label: "Extended Operation",
    description: "Performs an extended operation in Active Directory.",
  },
  perform: async (context, { connection, oid, value }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ oid, value });
    }

    try {
      const data = await client.exop(oid, value);

      return { data };
    } catch (err) {
      throw new Error(
        `Failed to perform extended operation with OID ${oid}: ${err}`,
      );
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
