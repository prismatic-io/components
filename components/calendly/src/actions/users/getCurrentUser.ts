import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection } from "../../inputs";
import { getCurrentUserExamplePayload } from "../../examplePayloads";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Returns basic information about your user account.",
  },
  perform: async (context, { connection }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get("/users/me");
    return { data };
  },
  inputs: {
    connection,
  },
  examplePayload: getCurrentUserExamplePayload,
});
