import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { isAuthenticatedExamplePayload as examplePayload } from "../examplePayloads";
import { isAuthenticatedInputs as inputs } from "../inputs";

export const isAuthenticated = action({
  display: {
    label: "Is Authenticated",
    description: "Check if the connection is authenticated.",
  },
  perform: async (context, { connection }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug("Checking authentication status");
    }

    try {
      return {
        data: true,
      };
    } catch (_err) {
      return {
        data: false,
      };
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});
