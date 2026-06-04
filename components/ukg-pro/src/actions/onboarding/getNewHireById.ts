import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getNewHireByIdExamplePayload } from "../../examplePayloads";
import { getNewHireByIdInputs } from "../../inputs";
import { getTenantIdentifier } from "../../util";







export const getNewHireById = action({
  display: {
    label: "Get New Hire by ID",
    description: "Retrieve detailed information for a specific new hire.",
  },
  inputs: getNewHireByIdInputs,
  perform: async (context, { connection, newHireId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const tenantIdentifier = getTenantIdentifier(connection);

    const { data } = await client.get(
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires/${newHireId}`,
    );

    return { data };
  },
  examplePayload: getNewHireByIdExamplePayload,
});
