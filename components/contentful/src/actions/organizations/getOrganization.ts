import { action } from "@prismatic-io/spectral";
import type { OrganizationProp } from "contentful-management";
import { createClient } from "../../client";
import { getOrganizationExamplePayload } from "../../examplePayloads";
import { getOrganizationInputs } from "../../inputs";

export const getOrganization = action({
  display: {
    label: "Get Organization",
    description: "Retrieves an organization by ID.",
  },
  perform: async (context, { connection, organizationId }) => {
    const client = createClient(connection, context);
    const data: OrganizationProp = (
      await client.getOrganization(organizationId)
    ).toPlainObject();
    return {
      data,
    };
  },
  inputs: getOrganizationInputs,
  examplePayload: { data: getOrganizationExamplePayload },
});
