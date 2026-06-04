import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createNewHireExamplePayload } from "../../examplePayloads";
import { createNewHireInputs } from "../../inputs";
import { getTenantIdentifier } from "../../util";







export const createNewHire = action({
  display: {
    label: "Create New Hire",
    description: "Create a new hire record to begin the onboarding process.",
  },
  inputs: createNewHireInputs,
  perform: async (context, { connection, newHireData }) => {
    const client = await createClient(connection, context.debug.enabled);
    const tenantIdentifier = getTenantIdentifier(connection);

    const { data } = await client.post(
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires`,
      newHireData,
    );

    return { data };
  },
  examplePayload: createNewHireExamplePayload,
});
