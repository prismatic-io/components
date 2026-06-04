import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createOrganizationExamplePayload } from "../../examplePayloads";
import { createOrganizationInputs } from "../../inputs";

export const createOrganization = action({
  display: {
    label: "Create Organization",
    description: "Creates a new organization.",
  },
  inputs: createOrganizationInputs,
  perform: async (context, { connection, organizationName }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.post("/organization", {
      name: organizationName,
    });
    return { data };
  },
  examplePayload: createOrganizationExamplePayload,
});
