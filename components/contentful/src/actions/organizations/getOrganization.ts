import { action, outputSchema } from "@prismatic-io/spectral";
import type { OrganizationProp } from "contentful-management";
import { createClient } from "../../client";
import { getOrganizationExamplePayload } from "../../examplePayloads";
import { getOrganizationInputs } from "../../inputs";
import { getOrganizationOutputSchema } from "../../outputSchemas";
export const getOrganization = action({
  display: {
    label: "Get Organization",
    description: "Retrieves an organization by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, organizationId }) => {
    const client = createClient(connection, context);
    const data: OrganizationProp = (
      await client.getOrganization(organizationId)
    ).toPlainObject();
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => getOrganizationExamplePayload,
  inputs: getOrganizationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationOutputSchema,
  }),
  examplePayload: getOrganizationExamplePayload,
});
