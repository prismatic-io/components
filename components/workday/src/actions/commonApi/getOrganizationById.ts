import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getOrganizationByIdExamplePayload } from "../../examplePayloads";
import { getOrganizationByIdInputs } from "../../inputs";
import { getOrganizationByIdOutputSchema } from "../../outputSchemas";
export const getOrganizationById = action({
  display: {
    label: "Get Organization by ID",
    description: "Retrieves an organization by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, organizationId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.common}/organizations/${organizationId}`,
    );
    return {
      data,
    };
  },
  inputs: getOrganizationByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationByIdOutputSchema,
  }),
  examplePayload: getOrganizationByIdExamplePayload,
});
