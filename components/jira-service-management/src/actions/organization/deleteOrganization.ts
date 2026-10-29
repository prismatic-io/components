import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteOrganizationExamplePayload } from "../../examplePayloads";
import { deleteOrganizationInputs } from "../../inputs";

export const deleteOrganization = action({
  display: {
    label: "Delete Organization",
    description: "Deletes an organization by ID.",
  },
  inputs: deleteOrganizationInputs,
  perform: async (context, { connection, organizationId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.delete(`/organization/${organizationId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: deleteOrganizationExamplePayload,
});
