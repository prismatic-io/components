import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { myConnectionField, version } from "../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get the information and metadata of the current user.",
  },
  perform: async (context, { version, connection }) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await client.get("/me");

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    version,
  },
});
