import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteOrganizationPropertyExamplePayload } from "../../examplePayloads";
import { deleteOrganizationPropertyInputs } from "../../inputs";

export const deleteOrganizationProperty = action({
  display: {
    label: "Delete Organization Property",
    description: "Removes a custom property from an organization by key.",
  },
  inputs: deleteOrganizationPropertyInputs,
  perform: async (context, { connection, organizationId, propertyKey }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.delete(
      `/organization/${organizationId}/property/${encodeURIComponent(propertyKey)}`,
      { headers: { "Content-Type": "application/json" } },
    );
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: deleteOrganizationPropertyExamplePayload,
});
