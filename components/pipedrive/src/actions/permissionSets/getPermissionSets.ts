import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const getPermissionSets = action({
  display: {
    label: "Get Permission Sets",
    description: "Gets all permission sets.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/permissionSets");
    return { data };
  },
  inputs: { connection: connectionInput },
});
