import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationPropertyExamplePayload } from "../../examplePayloads";
import { getOrganizationPropertyInputs } from "../../inputs";

export const getOrganizationProperty = action({
  display: {
    label: "Get Organization Property",
    description: "Returns the value of a single organization property.",
  },
  inputs: getOrganizationPropertyInputs,
  perform: async (context, { connection, organizationId, propertyKey }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/organization/${organizationId}/property/${encodeURIComponent(
        propertyKey,
      )}`,
    );
    return { data };
  },
  examplePayload: getOrganizationPropertyExamplePayload,
});
