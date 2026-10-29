import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationExamplePayload } from "../../examplePayloads";
import { getOrganizationInputs } from "../../inputs";

export const getOrganization = action({
  display: {
    label: "Get Organization",
    description: "Returns a single organization by ID.",
  },
  inputs: getOrganizationInputs,
  perform: async (context, { connection, organizationId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organization/${organizationId}`);
    return { data };
  },
  examplePayload: getOrganizationExamplePayload,
});
