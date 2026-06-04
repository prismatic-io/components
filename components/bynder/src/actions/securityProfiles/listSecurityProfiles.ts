import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSecurityProfilesResponse } from "../../examplePayloads";
import { connection } from "../../inputs";

export const listSecurityProfiles = action({
  display: {
    label: "List Security Profiles",
    description: "Retrieve all security profiles",
  },
  inputs: { connection },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/profiles");
    return { data };
  },
  examplePayload: {
    data: listSecurityProfilesResponse,
  },
});
