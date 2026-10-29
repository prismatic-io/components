import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listOrganizationPropertiesExamplePayload } from "../../examplePayloads";
import { listOrganizationPropertiesInputs } from "../../inputs";

export const listOrganizationProperties = action({
  display: {
    label: "List Organization Properties",
    description: "Returns the property keys stored against an organization.",
  },
  inputs: listOrganizationPropertiesInputs,
  perform: async (context, { connection, organizationId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/organization/${organizationId}/property`,
    );
    return { data };
  },
  examplePayload: listOrganizationPropertiesExamplePayload,
});
